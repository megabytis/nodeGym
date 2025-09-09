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

# Points to Remeber while creating APIs :

    - think as much possible cases as you can.
    - suppose u r creating an tinder app, u have created an send request API, okey!
    - cases like;
    - (i) what if there is something else is passing through parameter instead of 'interested' & 'ignored'. handle it !
    - (ii) what if user is sending multiple requests, i.e. after sending one request it shouldn't allow to send another reuests. so, handle it !
    - (iii) what if the reciever is sending us request, after we sent req to reciever, that shouldn't be allowed. handle it !
    - like this, think many edge cases and handle them one by one !
