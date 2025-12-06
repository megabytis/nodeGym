1. Create account in cloudinary & grab credentials like API key, API secret, and Cloud name
2. Install required npm packages (multer, cloudinary)
3. Create cloudinary /config file
4. Create upload /middleware
5. Create upload route inside /router/admin/adminProducts.js
6. Create upload controller inside /controllers/adminProductController.js
7. Test upload route

# Logic

Admin UI → sends image file
Backend → reads file (multer)
Backend → uploads to Cloudinary
Cloudinary → returns secure URL
Backend → sends URL back
Admin → saves URL in product

# Code

## 1. Create cloudinary /config file

**🎯 Goal of this step**

- Create one single place in your backend that:
- connects your app to Cloudinary
- uses env vars securely
- can be reused anywhere (products today, profile pics tomorrow)

> No upload logic yet.
> Only configuration.

```js
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
```

## 2. Create upload /middleware

```js
const multer = require("multer");

/**
 * Use memory storage so files are not saved on disk.
 * We will directly send the buffer to Cloudinary.
 */
const storage = multer.memoryStorage();

/**
 * File filter: (e.g. to allow only images)
 */
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

/**
 * Multer instance
 */
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
  fileFilter,
});

module.exports = upload;
```

## 3. Create upload route inside `/router/admin/adminProducts.js`

**🎯 Goal of this step**

- Expose a dedicated admin-only endpoint for image uploads
- Accept `multipart/form-data`
- Run auth + admin checks
- Run multer before controller

This route is **only responsible for uploading image and returning URL**
(it does NOT create or update a product).

### Route responsibility

```
POST /admin/products/upload-image
```

### Middleware order (important)

1. Authenticate user
2. Authorize admin role
3. Parse uploaded file (multer)
4. Pass control to controller

```js
adminRouter.post(
  "/upload-image",
  userAuth,
  authorize("admin"),
  upload.single("image"),
  uploadProductImage
);
```

Why this order matters:

- Security checks happen before expensive operations
- Multer runs before controller
- Controller assumes `req.file` already exists

---

## 6. Create upload controller inside `/controllers/uploadProductController.js`

**🎯 Goal of this step**

- Take image stored in memory by multer
- Upload it to Cloudinary using stream
- Return hosted image URL to frontend

### Controller responsibility

- ✅ Validate file exists
- ✅ Upload file to cloud
- ✅ Return `secure_url`
- ❌ Do NOT touch product model
- ❌ Do NOT store files locally

### Core logic (conceptual)

```
req.file.buffer → Cloudinary upload_stream → secure_url
```

```js
const cloudinary = require("../config/cloudinary");

const uploadProductImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "shopnexus/products",
        resource_type: "image",
        transformation: [
          { width: 800, height: 800, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      },
      (error, result) => {
        if (error) {
          return res.status(500).json({
            message: "Cloudinary upload failed",
            error: error.message,
          });
        }

        return res.status(200).json({
          imageUrl: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(req.file.buffer);
    // ⚠️Important⚠️
    // uploadStream.end(req.file.buffer) pushes the image to Cloudinary, and Cloudinary responds asynchronously with secure_url and public_id in the callback.
  } catch (err) {
    return res.status(500).json({
      message: "Image upload error",
      error: err.message,
    });
  }
};

module.exports = { uploadProductImage };
```

---

## 7. Test upload route

**🎯 Goal of this step**

- Verify full upload pipeline works end-to-end
- Ensure Cloudinary returns valid URL

### Testing via Postman / Thunder Client

- Method: `POST`
- URL:

```
/admin/products/upload-image
```

- Headers:

  - Authorization: `Bearer <admin-token>`

- Body:

  - Type: `form-data`
  - Key: `image`
  - Value: select image file

### Expected response

```json
{
  "imageUrl": "https://res.cloudinary.com/...",
  "publicId": "shopnexus/products/abc123"
}
```

If this works:
✅ Multer config is correct
✅ Cloudinary config is correct
✅ Streaming upload works
✅ Route protection works

---

## How this integrates with Product APIs

### ⚠️ Important design decision

The **upload route is isolated** from product creation.

Flow:

```
Admin uploads image
→ backend returns imageUrl
→ frontend stores imageUrl
→ admin creates/updates product using imageUrl
```

Example product payload:

```json
{
  "name": "Nike Shoes",
  "price": 1999,
  "image": "https://res.cloudinary.com/..."
}
```

✅ Product schema remains simple:

```js
image: String;
```

---

## Final Mental Model (One Diagram)

```
Admin UI
  ↓ (multipart/form-data)
Multer (memory)
  ↓ (req.file.buffer)
Upload Controller
  ↓ (stream)
Cloudinary
  ↓
secure_url
  ↓
Frontend
  ↓
DB (string URL)
```

---

## Why this design scales

- No filesystem dependency
- Works on Render / Docker / AWS
- Upload logic reusable for:

  - product images
  - profile images
  - documents

- Product APIs stay clean (CRUD only)

---

## Final Summary

- Cloudinary handles **storage + CDN**
- Multer handles **file parsing**
- Backend handles **security + streaming**
- Frontend stores **only URLs**
- No local files, no base64, no mess
