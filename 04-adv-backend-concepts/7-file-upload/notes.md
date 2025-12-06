# MULTER + CLOUDINARY

## What problem Multer solves

Express **cannot read files** by default.
It only understands JSON and URL-encoded data.

Files are sent as `multipart/form-data`.

**Multer is the middleware that parses this format.**

Without Multer:

- `req.body` ✅ (JSON)
- `req.file / req.files` ❌

With Multer:

- Browser sends file
- Multer parses it
- File becomes accessible in backend

---

## Request Flow (important)

```text
Frontend (multipart/form-data)
   ↓
Express server
   ↓
Multer middleware
   ↓
Controller logic
   ↓
Cloudinary
   ↓
Response back to frontend
```

👉 Multer always runs **before the controller**.

---

## Core Multer Concepts

Multer has **3 responsibilities**:

1. **Storage** – where file is kept (RAM or disk)
2. **File filter** – what files are allowed
3. **Limits** – size, count, protection

---

## Storage Options

### ✅ memoryStorage (BEST for Cloudinary / S3)

```js
const storage = multer.memoryStorage();
```

- File stays in **RAM**
- Never written to disk
- Perfect for cloud uploads

✅ Fast
✅ Clean
✅ Scales well
❌ Not for huge files (videos, >50MB)

👉 **Correct choice for personal projects**

---

### ❌ diskStorage (avoid in production)

Writes files to server disk.

Problems:

- Disk fills up
- Not scalable
- Breaks on platforms like Render / Vercel

Use **only** if filesystem storage is required.

---

## File Filter (Security Gate)

Controls **which files are accepted**.

e.g.:-

```js
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};
```

Why this matters:

- Prevents executable uploads
- Prevents malware
- Stops junk data

✅ Mandatory in production.

---

## Limits (Protection)

```js
limits: {
  fileSize: 5 * 1024 * 1024, // 5MB
  files: 1
}
```

Protects against:

- Memory abuse
- DoS attacks
- Accidental large uploads

---

## Creating Multer Instance

```js
const upload = multer({
  storage,
  fileFilter,
  limits,
});
```

What Multer does internally:

- Reads incoming file stream
- Validates type & size
- Stores file **in memory**
- Attaches it to `req`

---

## Multer Middleware Methods

### ✅ `upload.single("image")`

For a single file.

```js
upload.single("image");
```

Result:

```js
req.file;
```

Use for:

- product image
- profile picture
- single document upload

---

### (Not needed now, just awareness)

- `upload.array()` → multiple files
- `upload.fields()` → multiple input fields

---

## What `req.file` Contains

With `memoryStorage()`:

```js
req.file = {
  fieldname: "image",
  originalname: "shoe.png",
  mimetype: "image/png",
  buffer: <Buffer ...>,
  size: 243212
}
```

🔥 **Most important property**:

```
req.file.buffer
```

This is the raw binary image data.

---

Everything above stops at Multer.

Now comes **controller + Cloudinary + frontend flow**.

---

## Controller Stage (after Multer)

When request reaches controller:

✅ Multer already ran
✅ File is already parsed
✅ File exists in memory

Controller does **NOT** deal with multipart anymore.

---

## Cloudinary Upload (Streaming Buffer)

In controller:

1. Check file exists
2. Take `req.file.buffer`
3. Stream buffer directly to Cloudinary
4. Receive hosted image URL
5. Send URL back to frontend

Conceptually:

```text
RAM buffer → Cloudinary CDN → secure image URL
```

No disk. No temp files.

That’s why `memoryStorage()` + streaming is elite.

---

## What Cloudinary Returns

After upload, Cloudinary gives:

- `secure_url` → public HTTPS image
- `public_id` → internal reference (for delete later)

Example response from backend:

```json
{
  "imageUrl": "https://res.cloudinary.com/...",
  "publicId": "shopnexus/products/abc123"
}
```

✅ Backend job ends **here**.

---

## Frontend Integration (final step)

Frontend logic:

1. Admin selects image
2. Frontend sends file to:

   ```
   POST /admin/products/upload-image
   ```

3. Receives `imageUrl`
4. Stores it as a string
5. Sends this URL when creating/updating product:

```json
{
  "name": "Product",
  "price": 999,
  "image": "https://res.cloudinary.com/..."
}
```

✅ Product schema remains:

```js
image: String;
```

No file handling in product API.

---

## Mental Model (REMEMBER THIS)

```
Browser
  ↓ (multipart/form-data)
Multer
  ↓ (req.file.buffer)
Controller
  ↓ (stream)
Cloudinary
  ↓ (secure_url)
Frontend
  ↓
Database (string URL)
```

---

## Why Multer + Cloudinary is the Best Combo

- No filesystem dependency
- Works on Render, AWS, Docker
- CDN-backed images
- Optimized automatically
- Clean separation of responsibilities

This is **how modern backends handle uploads**.

---

## Final Summary

- Multer handles `multipart/form-data`
- `memoryStorage()` keeps file in RAM
- `fileFilter + limits` secure the API
- `upload.single("image")` → `req.file`
- `req.file.buffer` → stream to Cloudinary
- Backend returns image URL
- Frontend stores URL in DB
- **No files stored locally**
