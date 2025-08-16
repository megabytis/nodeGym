1. Create an Account
2. Login
3. Create/Update profile
4. Feed page - for exploring
5. Send Connection request
6. See the requests wh've sent/recieved
7. See our Matches

# Low Level Design (LLD)

## DB Design

### User Table

- `firstName`
- `lastName`
- `emailId`
- `password`
- `age`
- `gender`

### ConnectionRequest Table

- `fromUserId`
- `toUserId`
- `status` → `PENDING | ACCEPTED | REJECTED | IGNORED`

---

## Tech Planning

We will build **2 microservices**:

### Frontend (FE)

- React

### Backend (BE)

- Node.js
- MongoDB

---

## API Endpoints (CRUD Operations)

### Auth & Profile

- `POST   /signup` → User signup
- `POST   /login` → User login
- `GET    /profile` → Fetch user profile
- `POST   /profile` → Create profile
- `PATCH  /profile` → Update profile
- `DELETE /profile` → Delete profile

### Connection Requests

- `POST   /sendRequest`
  - Actions: `interested`, `ignore`
- `POST   /reviewRequest`
  - Actions: `accept`, `reject`
- `GET    /requests` → Fetch pending requests
- `GET    /connections` → Fetch accepted connections
