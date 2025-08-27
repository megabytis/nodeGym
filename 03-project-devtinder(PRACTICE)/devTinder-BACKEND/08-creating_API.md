# Creating POST API for MongoDB Data Storage

## Basic POST API Example:

```js
// Creating API
app.post("/signup", async (req, res) => {
  const User = new UserModel({
    firstName: "Lalu",
    lastName: "Yadav",
    age: 51,
    email: "lallu@yadav.com",
  });

  try {
    await User.save();
    res.send("User added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving user");
  }
});
```

## 🎯 Key Points:

- Created a route for `/signup`
- Created a User document using UserModel
- Saved it to MongoDB
- Sent response back to client

---

# Saving Data Using Postman 'Body' Section

- instead of , we can directly write it in JSON format inside POSTMAN's Body section then will send a post req to /signup, then the document will be stored in mongo

## 🚀 Dynamic Data from Request Body:

Instead of hardcoding data i.e. writing document by using mongoose-model, we can send data through Postman's Body section:

```json
// POSTMAN body section :
{
  "firstName": "Madhusudan",
  "lastName": "Bhukta",
  "age": 21,
  "email": "midnightwildrunner@proton.me"
}
```

```js
app.post("/signup", async (req, res) => {
  // Access data from request body
  const { firstName, lastName, age, email } = req.body;

  const User = new UserModel({
    firstName: firstName,
    lastName: lastName,
    age: age,
    email: email,
  });

  console.log(req.body);

  try {
    await User.save();
    res.send("User added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving user");
  }
});
```

## 🔍 How to See Request Data:

- Send data through Postman Body (JSON format)
- Access it using `req.body`
- Log it to see what data was sent: `console.log(req.body)`

## ⚠️ Common Issue - Getting 'undefined':

```js
app.post("/signup", (req, res) => {
  console.log(req.body); // undefined ❌
});
```

**Why?** Express doesn't automatically parse JSON body data.

## ✅ Solution - Middleware:

```js
// Middleware to parse JSON bodies
app.use(express.json());

// Now this works:
app.post("/signup", (req, res) => {
  console.log(req.body); // { firstName: "miku", email: "miku0123@gmail.com" } ✅
});
```

## 🎯 Why `express.json()` Middleware:

- Converts JSON request body to JavaScript object
- Makes `req.body` accessible in route handlers
- Applies to ALL routes (global middleware)
- Must be placed BEFORE route handlers

## 🧪 Testing with Postman:

1. Set method to POST
2. URL: `http://localhost:3000/signup`
3. Go to Body tab → Select "raw" → Choose "JSON"
4. Enter JSON data:

```json
{
  "firstName": "Lalu",
  "lastName": "Yadav",
  "age": 51,
  "email": "lallu@yadav.com"
}
```

5. Send request
