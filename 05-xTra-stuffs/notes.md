1. What is `x-api-key` header?

- When one backend talks to another backend, there is no user, no cookies, no login screen.
- How does a website backend would know WHO is calling it?
- Ans: The calling app sends a secret string with every request.
- That secret string is `apiKey`.

2. in backend language `ingest` means: "to receive data and store it”

## 'req' related stuffs :-

3. **_ Do NOT pass req to services when: _**
   - business logic depends on headers/body/query
   - service reads cookies directly
   - service assumes Express
   - service logic becomes HTTP-coupled

4. **_ Passing req is acceptable for cross-cutting concerns, where: _**
   - req is only a context carrier
   - business logic does NOT depend on it
   - it’s used for side-effects only

5. **_But there’s an even better pattern (senior-level)_**

Instead of passing req, pass a context object.

```js
// Controller;

const context = {
  ipAddress: req.ip,
  userAgent: req.headers["user-agent"],
};

await loginUser(data, context);
```
