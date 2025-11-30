# How To Apply Domain Modeling In Any Backend Project

Domain Modeling sounds big, but applying it is extremely simple if we follow a clear step-by-step method.

Here is a **universal, project-agnostic formula** for using domain modeling in real backend apps (chat apps, booking apps, blogs, e-commerce, SaaS, anything).

---

# 1. Start With These 3 Questions

Before writing ANY backend route, ask:

### 1) What are the main business entities?

- User?
- Message?
- Task?
- Ticket?
- Payment?
- Booking?

### 2) What rules must always be true?

(e.g. “Task cannot be completed if deadline passed”)

### 3) What states can entities be in?

(pending → active → completed → archived)

Our answers define our **domain**.

---

# 2. Create a Domain Folder

Every backend should have:

```
src/domain/
```

Inside it, create pure logic files:

```
businessRules.js
stateTransitions.js
domainErrors.js
```

This is the **brain** of our application — NOT controllers, NOT models.

---

# 3. Move ALL Business Logic Into Domain Files

Say we’re building a Chat App.

Business rules might be:

- a user cannot message a blocked user
- empty messages are invalid
- message edits allowed only within 10 minutes
- unread count resets when chat is opened

Put these rules in:

```
src/domain/chatRules.js
```

Example:

```js
function canSendMessage(sender, receiver) {
  return !receiver.blockedUsers.includes(sender.id);
}
```

This is domain logic.

It is:

- pure
- testable
- reusable
- not tied to Express / Mongo
- not tied to a route

---

# 4. Services Apply Domain Rules

Services call domain rules before doing database work.

Example for a generic app:

```js
// messageService.js
if (!chatRules.canSendMessage(user, receiver)) {
    throw new DomainError("User is blocked");
}

const message = new MessageModel({ ... });
await message.save();
```

### Controllers should NEVER contain this logic.

---

# 5. Controllers Become Super Clean

Because services + domain do the hard work.

Controller:

```js
createMessage(req, res) {
    const result = await messageService.send(req.user, req.body);
    res.json(result);
}
```

That’s it.

---

# 6. Pure Functions = Predictable Logic

Domain functions:

- take input
- return true/false
- no DB
- no network requests
- no side effects

Perfect for:

- unit testing
- sharing logic across multiple workflows
- future microservices

---

# 7. Add Domain Errors for Clarity

Create:

```
src/domain/domainErrors.js
```

Define:

```js
class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = "DomainError";
  }
}
```

Now our services can throw **clear, meaningful errors**.

---

# 8. Apply Domain Modeling to ANY Project Type

Here are examples of domain logic in different apps:

---

## Chat App

Rules:

- canSendMessage
- canCreateGroup
- canAddUsersToGroup
- canBlockUser

State machine:

- message: sent → delivered → seen

---

## Booking App

Rules:

- canBookSlot
- canCancelBooking
- canModifyBooking

State machine:

- pending → confirmed → completed → cancelled

---

## Task Manager

Rules:

- canCompleteTask
- canAssignTask
- canUpdatePriority

State machine:

- todo → in-progress → completed → archived

---

## Finance App

Rules:

- canWithdraw(Money)
- canTransfer
- cannotHaveNegativeBalance

State:

- pending → processed → settled

---

# 9. Golden Formula for Every Backend Developer

Here’s the formula we should follow in all our projects:

```
If it's a business rule, put it in /domain.
If it's a workflow, put it in /services.
If it's an API, put it in /controllers.
If it's data storage, put it in /models.
```

Follow this, and our backend will ALWAYS be clean.

---

# Summary

Domain modeling for normal MERN/backend projects:

✔ Identify entities  
✔ Identify business rules  
✔ Create domain folder  
✔ Put pure functions with logic  
✔ Use them inside services  
✔ Keep controllers thin  
✔ Keep models clean  
✔ Avoid mixing responsibilities

This is how we build maintainable backends like a real engineer.
