**Auth folder tree (notes):**

```
/auth
  auth.routes.js        // define endpoints
  auth.controller.js    // parse request, call service
  auth.service.js       // business logic (tokens, sessions)
  auth.model.js         // session model for refresh tokens
  token.utils.js        // sign/verify helpers

/middleware
  authMiddleware.js     // verify access token
  roleMiddleware.js     // authorize roles
```

**Responsibilities:**

* Routes: keep clean, only input->controller mapping.
* Controller: call service, format responses.
* Service: everything about token creation, rotation, DB sessions.
* Model: DB schema details and indexing.
* Utils: token signing/verification logic.
