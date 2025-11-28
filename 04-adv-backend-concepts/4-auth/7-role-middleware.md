# Role Middleware Implementation

**Purpose:** Protect routes so only specific roles can access them.

---

## 1. The Code

Create `src/middlewares/roleMiddleware.js`:

```javascript
/**
 * @param {...String} allowedRoles - Roles allowed to access the route
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // 1. Ensure user is authenticated first
    if (!req.user || !req.user.role) {
      return res.status(401).json({ error: "Unauthorized: User not identified" });
    }

    // 2. Check if user's role is in the allowed list
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Forbidden: You do not have permission to perform this action",
      });
    }

    // 3. Access Granted
    next();
  };
};

module.exports = { authorize };
```

---

## 2. Usage

Apply it **after** your authentication middleware.

```javascript
const { userAuth } = require("./middlewares/authMiddleware");
const { authorize } = require("./middlewares/roleMiddleware");

// Only Admin can create products
router.post(
  "/products",
  userAuth,            // 1. Identify User
  authorize("admin"),  // 2. Check Role
  createProduct        // 3. Execute Logic
);

// Admin OR Seller can update inventory
router.patch(
  "/products/:id/stock",
  userAuth,
  authorize("admin", "seller"),
  updateStock
);
```

---

## 3. Key Concepts

*   **401 Unauthorized:** "I don't know who you are." (Missing/Invalid Token)
*   **403 Forbidden:** "I know who you are, but you can't do this." (Wrong Role)
*   **Order Matters:** Always run `userAuth` (authentication) before `authorize` (authorization).