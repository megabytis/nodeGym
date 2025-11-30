# Entities vs Value Objects

This is one of the foundational ideas behind clean backend design.  
We will use this in **every backend project**, not just complex ones.

---

# What is an Entity?

An **Entity** is a business object that:

- has a unique ID  
- persists over time  
- can change data but still be the same entity  

Examples for any backend application:

- User  
- Message  
- Comment  
- Ticket  
- Blog Post  
- Wallet  
- Invoice  
- ChatRoom  

### Key Property:
> Identity stays same even if data changes.

Example:

```
User #37
name: "Ravi" → "Ravi Kumar"
email updated
profile updated
```

Still the same user.  
Identity is permanent.

Entities typically map to **Mongoose Models / DB rows**.

---

# What is a Value Object?

A **Value Object** has NO identity.  
It is defined ONLY by the value inside it.

Examples:

- Address  
- Price  
- Money  
- Coordinates  
- DateRange  
- Duration  
- Quantity  
- Email Address  
- Phone Number  

### Key Property:
> If all fields match, the objects are equal.

Example:

```
Price(100, "INR") == Price(100, "INR")
```

Value Objects are:

- immutable  
- easy to test  
- easy to validate  
- perfect for storing tiny business rules  

---

# Why do we even care?

This separation helps your backend stay clean.

### Entities represent “things that exist.”

### Value Objects represent “data that describes things.”

Example in a messaging app:

- **Message** → Entity  
- **Timestamp** → Value Object  
- **Content** (text) → Value Object  

Example in a ticketing system:

- **Ticket** → Entity  
- **SeatNumber** → Value Object  
- **Price** → Value Object  

---

# Entities live in DB, Value Objects live inside Entities

Example schema:

```js
User {
  _id: Entity
  name: ValueObject
  address: ValueObject
}
```

Example:

```js
Ticket {
  _id: Entity
  seat: ValueObject
  price: ValueObject
}
```

---

# Why backend developers love Value Objects

Because they let you encode rules in one place:

Example:

```js
function validateEmail(email) {
    return email.includes("@");
}
```

Email becomes a **value object** with:

- validation  
- parsing  
- rules  
- formatting logic  

---

# Common Real-Life Examples

### Social App
- Entity: User, Post  
- VO: Username, Caption, Timestamp  

### Chat App
- Entity: ChatRoom, Message  
- VO: Content, SentAt  

### Task Manager
- Entity: Task  
- VO: Priority, Deadline  

### Finance App
- Entity: Transaction  
- VO: Amount, Currency  

Value Objects appear everywhere.

---

# Summary

**Entity** = has identity, changes over time.  
**Value Object** = NO identity, defined by value, usually immutable.