# CRUD Operations

- After defining SCHEMA, I created a model using the schema .
- Now i can do CRUD(Create, Read, Update, Delete) operations using that Model.

## CREATE

```js
const newUser = new User({ name: "Miku", age: 21 });
await newUser.save();
```

## READ

```js
const users = await User.find({ age: 21 });
console.log(users);
```

## UPDATE

```js
await User.updateOne({ name: "Miku" }, { $set: { age: 22 } });
```

## DELETE

```js
await User.deleteOne({ name: "Miku" });
```
