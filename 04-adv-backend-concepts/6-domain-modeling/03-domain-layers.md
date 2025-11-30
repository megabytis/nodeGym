# Domain Layers — The Architecture Behind Clean Backend

Domain modeling uses a layered architecture so each part of our backend has ONE clear responsibility.

In simple words:

> **Controller → Service → Domain → Model**
>  
Each layer knows exactly what it should and should NOT do.

Let’s break them down.

---

# 1. **Controller Layer — “API Entry Gate”**

### What controllers DO:
- Receive HTTP requests
- Validate request body (optional)
- Call service functions
- Send JSON responses

### What controllers MUST NOT do:
- No business logic  
- No DB logic  
- No stock logic  
- No order state logic  
- No payment logic  

**Controllers are just traffic cops.**

Example:

```js
// orderController.js
createOrder(req, res) {
    const result = await orderService.create(req.user._id, req.body);
    res.json(result);
}
```

Clean. Tiny. Beautiful.

---

# 2. **Service Layer — “Use Cases / Workflows”**

This is where the actual *process* of doing something happens.

Services:
- talk to **models**
- talk to **domain rules**
- talk to **other services**
- talk to external APIs
- coordinate workflows  
  (example: checkout = calculate total → reduce stock → create order → send email)

### Responsibilities:
- Implement workflows
- Enforce sequence of steps
- Catch domain rule errors
- Prepare data for domain checks

### Example:

```js
// orderService.js
const order = new Order(orderData);
if (!canPlaceOrder(order)) throw new DomainError();

await order.save();
```

**Controllers NEVER save orders.  
Services do.**

---

# 3. **Domain Layer — “Pure Business Rules”**  
This is the heart of domain modeling.

Domain Layer contains:

- order lifecycle logic
- payment rules
- stock rules
- refund rules
- cancellation rules
- domain-specific errors

### Domain code MUST be:
- pure functions
- stateless
- no DB calls ever
- reusable
- testable

Example:

```js
function canCancelOrder(status) {
    return ["pending", "processing"].includes(status);
}
```

Domain = **business logic**, not technical logic.

---

# 4. **Model Layer (Mongoose Models) — “Data Storage”**

Models only do:
- define schema
- save data
- update data
- query database

Models **never**:
- validate business rules
- change order states
- decide stock logic
- handle refunds

**Models store data. They don’t decide rules.**

---

# The “Golden Rule” of Domain Architecture

```
Controllers are dumb.
Services are smart.
Domain is law.
Models store data.
```

---

# Visual Summary

```
REQUEST
   ↓
Controller  → tiny, clean
   ↓
Service     → full workflow
   ↓
Domain      → pure business rules
   ↓
Model       → DB persistence
   ↓
RESPONSE
```

---

# Why This Matters?

Because when backend grows (like Amazon-scale e-commerce):

- controllers remain clean
- domain rules stay centralized
- services remain readable
- bugs reduce drastically
- adding features becomes easier

This is EXACTLY how real companies design production backends.

