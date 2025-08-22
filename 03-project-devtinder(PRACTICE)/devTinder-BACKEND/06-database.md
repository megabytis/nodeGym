- Now we'll create database using a nodeJS library 'MONGOOSE' instead of Raw mongoDB
- mongoose sits on the top of mongoDB
- in cluster string "mongodb+srv://devTinder-DB:<password>@devtinder.yzcimn0.mongodb.net/", after end .net/ , we can write our database name to connect to the DB through cluster
- connect database.js file with main app.js by requiring there
- in app.js first DB should connect to app, after then app should listen to port(v.v.IMP)

# let's work in database.js

- first of all we'll define an Schema
- Everything in Mongoose starts with a Schema
- Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
