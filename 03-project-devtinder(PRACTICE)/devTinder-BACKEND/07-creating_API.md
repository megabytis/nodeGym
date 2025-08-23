-> Now, we'll create a POST API for saving data in our mongoDB, e.g. 👇

```js
// creating API
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
  }
});
```

- here i've create a route for /signup
- after creating a User document using UserModel, we'll save it then will send response & try in postman
