**Roles vs Permissions:**

* Role = group of permissions. (e.g., `user`, `admin`, `seller`)
* Permissions = actions allowed (e.g., `create:product`, `delete:order`).

**When to use simple roles vs permission model:**

* Start with roles for ShopNexus: `user`, `admin`.
* If later you need fine-grained control per action or per resource, switch to permission matrix.

**User model (partial):**

```js
user: {
  _id,
  name,
  email,
  passwordHash,
  role: { type: String, enum: ['user','admin'], default: 'user' }
}
```

**How to enforce RBAC:**

* `authMiddleware` verifies the AT and attaches `req.user`.
* `roleMiddleware(allowedRoles...)` checks `req.user.role` and permits or denies.

**Examples:**

* `authorize('admin')` used on admin routes (category create, product management).
* `authorize('user')` default for normal user routes.

**Best practices:**

* Don’t trust the client’s role value—always check server-side.
* Keep roles small and clear.
* Log authorization failures for auditing.