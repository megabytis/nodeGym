**Purpose:** Enforce RBAC on specific routes.

**API design:**

```js
const authorize = (...roles) => (req, res, next) => { ... }
```

**Behavior:**

1. Ensure `req.user` exists (use `authMiddleware` before this).
2. If `req.user.role` is in allowed `roles` → `next()`.
3. Otherwise → return 403 Forbidden.

**Examples:**

* `router.post('/admin/product', authMiddleware, authorize('admin'), adminController.createProduct)`

**Notes:**

* You can accept multiple roles: `authorize('admin','seller')`.
* Log the attempt for security auditing.