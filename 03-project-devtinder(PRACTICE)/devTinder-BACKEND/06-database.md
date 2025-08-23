- Now we'll create database using a nodeJS library 'MONGOOSE' instead of Raw mongoDB
- mongoose sits on the top of mongoDB
- in cluster string "mongodb+srv://devTinder-DB:<password>@devtinder.yzcimn0.mongodb.net/", after end .net/ , we can write our database name to connect to the DB through cluster
- connect database.js file with main app.js by requiring there
- in app.js first DB should connect to app, after then app should listen to port(v.v.IMP)

# let's work in database.js

- first of all we'll define an Schema
- Everything in Mongoose starts with a Schema
- Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.

### Mongoose syntax

```js
const mongoose = require("mongoose");

// 1. Connect
await mongoose.connect("mongodb://localhost:27017/testDB");

// 2. Schema (rules/shape of documents)
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

// 3. Model (represents "users" collection)
const User = mongoose.model("UserModelName", userSchema);

// 4. CRUD Operations

// CREATE
const newUser = new User({ name: "Miku", age: 21 });
await newUser.save();

// READ
const users = await User.find({ age: 21 });
console.log(users);

// UPDATE
await User.updateOne({ name: "Miku" }, { $set: { age: 22 } });

// DELETE
await User.deleteOne({ name: "Miku" });
s;
```

### In /src we'll create

    - /config , which will contain database.js, where we'll connect with our DB string, then export it
    - /models , where we'll create diff js files for multiple mongoose models like user.js admin.js etc... where we'll create SCHEMA & MODEL using that schema & will export that model

-> Like, there is a schema for "User", we can create multiple schema for like "Admin" etc...etc... & using those particular schemas we've created models for them
-> Now think like models are "classes"
-> Then we'll create instances of those models, think like instances of "objects" of those model(classe's) 😉
