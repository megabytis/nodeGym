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

// here 'testDB' in last of the URL is database name which will created on mongoDB compass :)

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

# Mongoose: Schema, Model & Instance

## 1. Schema

**Definition**: A Schema is a blueprint or structure that defines the shape, data types, validation rules, and default values for documents in a MongoDB collection. It's like a template that tells Mongoose how your data should look.

**Key Points**:

- Defines field names and their data types
- Sets validation rules and constraints
- Specifies default values
- Defines methods and virtuals
- Acts as a configuration object

**Example**:

```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  age: {
    type: Number,
    min: 0,
    max: 120,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
```

## 2. Model

**Definition**: A Model is a constructor function compiled from a Schema. It creates a connection between your Schema and a MongoDB collection. Models are responsible for creating, reading, updating, and deleting documents from the database.

**Key Points**:

- Created by compiling a Schema using `mongoose.model()`
- Represents a collection in MongoDB
- Provides methods for database operations (CRUD)
- Acts as a class/constructor for creating document instances

**Example**:

```javascript
// Create Model from Schema
const User = mongoose.model("User", userSchema);

// Model methods for database operations
const users = await User.find(); // Find all users
const user = await User.findById("60d5ec49f99b2c1a3c8e4f5a"); // Find by ID
const newUser = await User.create({ name: "John", email: "john@email.com" }); // Create
```

## 3. Instance (Document Instance)

**Definition**: An Instance is a single document created from a Model. It represents one specific record/document in your MongoDB collection with actual data. Each instance has its own methods and properties.

**Key Points**:

- Created using `new Model()` or `Model.create()`
- Represents a single document in the collection
- Has instance methods like `save()`, `remove()`, `updateOne()`
- Contains actual data that matches the Schema structure

**Example**:

```javascript
// Creating instances
const user1 = new User({
  name: "Alice",
  email: "alice@email.com",
  age: 25,
});

// Save instance to database
await user1.save();

// Another way to create instance
const user2 = await User.create({
  name: "Bob",
  email: "bob@email.com",
  age: 30,
});

// Instance methods
user1.age = 26;
await user1.save(); // Update the document

console.log(user1.name); // Access instance data
```

## Visual Relationship

```
Schema (Blueprint)
    ↓
Model (Constructor/Collection Interface)
    ↓
Instance (Actual Document/Record)
```

## Complete Example

```javascript
const mongoose = require("mongoose");

// 1. SCHEMA - Define the structure
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pages: { type: Number, min: 1 },
  published: { type: Date, default: Date.now },
});

// 2. MODEL - Create constructor from schema
const Book = mongoose.model("Book", bookSchema);

// 3. INSTANCES - Create actual documents
const book1 = new Book({
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  pages: 180,
});

const book2 = new Book({
  title: "1984",
  author: "George Orwell",
  pages: 328,
});

// Save instances to database
await book1.save();
await book2.save();

// Use model methods
const allBooks = await Book.find();
const specificBook = await Book.findOne({ title: "1984" });
```

## Key Takeaways

Think of it like:

- **Schema** = House blueprint
- **Model** = House builder/constructor
- **Instance** = Actual house built from the blueprint
