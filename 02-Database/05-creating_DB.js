/*
STEPS TO SETUP MONGODB :--

1. go to mongodb.com & sign-up
2. create a free tier M0 cluster remember the ID & password 
3. download mongoDB Compass
4. copy the Connection String, add ur PAssword in that string & paste it in mondoDB compass
5. Then connect !!!
*/
const md = require("mongodb");

// connecting url
const url =
  "mongodb+srv://miku-DB:qR81t7wzNMiFEM95@mikudb.jubamcj.mongodb.net/";
const client = new md.MongoClient(url);

// giving a name to our database
const dbname = "Testing_DB";

async function callMe() {
  await client.connect();
  console.log("Client connected successfully");

  //   after client connect, we'll create an database
  const db = client.db(dbname);

  // Now i'll add documents/data to my database
  const collection = db.collection("data-1");

  // Inserting a Document
  const insertDoc = await collection.insertMany([
    {
      name: "Prachi Sucharita",
      Age: 22,
      College: "ITER, SOA, BBSR",
      Course: "B.Tech CS",
    },
  ]);

  // Finding all Documents
  const findResult = await collection.find({}).toArray();
  console.log("Document found :- \n", findResult);
  JSON.stringify;

  // Finding documents with Query Filter
  const xyz = await collection.find({ Course: "BBA" }).toArray();
  const filteredDocs = JSON.stringify(xyz, null, 2);
  console.log(
    `\nFound Documents filtered by { Course: "BBA" } : \n${filteredDocs}`
  );

  // Updating a Document
  const updateDoc = await collection.updateOne(
    {
      Course: "BCA",
    },
    {
      $set: {
        nickName: "miku",
        name: "Madhusudan Bhukta",
      },
    }
  );

  return "everything's now ready";
}

callMe()
  .then(console.log)
  .catch((err) => console.log(err))
  .finally(() => client.close());
