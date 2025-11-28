# Role-Based Access Control (RBAC)

**RBAC** restricts network access based on the roles of individual users within an enterprise.

---

## 1. Roles vs. Permissions

### **Role**
A label assigned to a user that represents their job function.
*   **Examples:** `admin`, `seller`, `customer`, `support`.
*   **Usage:** "Allow `admin` to access this route."

### **Permission**
A specific action that can be performed on a resource.
*   **Examples:** `create:product`, `delete:user`, `read:order`.
*   **Usage:** "Allow anyone with `delete:user` permission to access this route."

### **The Relationship**
A **Role** is just a collection of **Permissions**.
*   `admin` = [`create:product`, `delete:user`, `read:order`, ...]
*   `seller` = [`create:product`, `read:order`]

---

## 2. Strategy: Simple vs. Scalable

### **Level 1: Simple Role Checks (Start Here)**
For most MVPs and small apps, you only need to check the role.
*   **Logic:** `if (user.role === 'admin') allow()`
*   **Pros:** Easy to implement, zero complexity.
*   **Cons:** Hard to manage if you have complex rules (e.g., "Editor can publish but not delete").

### **Level 2: Permission-Based (Advanced)**
For complex apps (ERP, Enterprise SaaS).
*   **Logic:** User has a role -> Role maps to permissions -> Check permission.
*   **Code:** `if (user.permissions.includes('product:delete')) allow()`
*   **Pros:** Extremely flexible.
*   **Cons:** Requires more database setup (Roles table, Permissions table).

---

## 3. Implementation (Level 1)

### **Database Schema (User Model)**
Keep it simple. Store the role directly on the user.

```javascript
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: {
    type: String,
    enum: ["user", "admin", "seller"], // 🔒 Restrict values
    default: "user",
  },
});
```

### **The Flow**
1.  **Login:** User logs in.
2.  **Token:** Server issues JWT containing `{ userId: "...", role: "admin" }`.
3.  **Request:** Client sends JWT in header.
4.  **Auth Middleware:** Decodes JWT, attaches `req.user = { role: "admin" }`.
5.  **Role Middleware:** Checks `req.user.role`.

---

## 4. Best Practices

1.  **Fail Safe:** Default to "Access Denied". explicitly allow access.
2.  **Don't Trust Client:** Never accept `role` from the frontend body during signup. Always default to `user` or require an admin token to create admins.
3.  **Hierarchy:** If you have `superadmin` > `admin` > `user`, your code should handle inheritance (e.g., `superadmin` has all `admin` rights).
4.  **Audit Logs:** Log every failed authorization attempt (403 Forbidden). It helps detect attacks.