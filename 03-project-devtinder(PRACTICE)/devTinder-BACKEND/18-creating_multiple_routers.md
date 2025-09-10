- Now i'll create multiple routers and keep multiple APIs under each router!

## **authRouter**

- POST /auth/sign-up
- POST /auth/login
- POST /auth/logout

## **profileRouter**

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## **requestRouter**

- POST /request/send/:status/:toUserID (status can be either "interested" or "ignored")
- POST /request/review/accepted/:requestID
- POST /request/review/rejected/:requestID

## **userRouter**

- GET /user/connections
- GET /user/requests/recieved
- GET /user/feed

-> ☝️ here r our APIs under separate routers

# Now let's create them !

    - i've created a separate /routers directory & under it i'll create multiple router file like auth-router.js, user-router.js etc.... etc....
