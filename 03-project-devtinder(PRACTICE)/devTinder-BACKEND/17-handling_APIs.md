- now we'll decide how many APIs our application needs
- By thinking of that we'll first list down some needed APIs

- e.g. **_ DevTinder APIs _**

  --> better to refer such websites like whom u r making & using browser's dev tools -> network section & findout which types of APIs they're using for what purpose !

  - POST /auth/sign-up
  - POST /auth/login
  - POST /auth/logout

  - GET /profile/view
  - PATCH /profile/edit (to edit user's profile except password)
  - PATCH /profile/edit/password (to edit user's password only)

  - POST /request/send/:status/:toUserID (status can be interested/ignored)
  - POST /request/review/:status/:userID (status can be accepted/rejected)

  - GET /user/connections
  - GET /user/requests/recieved
  - GET /user/feed (gives user the profiles of other users)

- Writing all these APIs under one app.js file WILL RUN our application 100% .
- But for BEST PRACTICES, it's better to use 'expressRouter' for handling APIs.
- first of all We'll group some APIs on the basis of similarity between route /path category & make expressRouter for a each group

- e.g. :

# **_ grouping DevTinder APIs & using express-Router _**

## **authRouter**

- POST /auth/sign-up
- POST /auth/login
- POST /auth/logout

## **profileRouter**

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## **requestRouter**

- POST /request/send/:status/:toUserID
- POST /request/review/:status/:requestID

## **userRouter**

- GET /user/connections
- GET /user/requests/recieved
- GET /user/feed (gets you the profiles of other user's)

- It makes very easier to manage all APIs, more readable, scalable, testable etc....
- here i have renamed the API path-names also, like; from /sign-up to /auth/sign-up like this.....
- Cuz for categorizing some APIs under separate express-routers, it's always better to give API path names according to that 😉

- prviously inside app.js we're creating like;

```js
const app = express();
app.post("/login");
```

- But now ;

```js
const router = express.Router();
router.post("/login");
```

- There is no major difference between them, express is internally managing them.
- So, fom now we'll use like router.get(), router.post() or whatever we'll give the router variable name, like this .....
