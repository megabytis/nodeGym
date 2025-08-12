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

  // ✨✨✨ CRUD (Create, Read, Update, Delete) operation ✨✨✨

  // 1️⃣ CREATE
  // Inserting Document
  // const insertDoc = await collection.insertMany([
  //   {
  //     name: "Prachi Sucharita",
  //     Age: 22,
  //     College: "ITER, SOA, BBSR",
  //     Course: "B.Tech CS",
  //     email: "ps123@gmail.com",
  //   },
  //   {
  //     name: "Karan Samal",
  //     Age: 20,
  //     College: "Utkal University, Bhubaneswar",
  //     Course: "BBA",
  //     email: "karan@gmail.com",
  //   },
  // ]);

  // 2️⃣ READ
  // Finding all Documents
  const findResult = await collection.find({}).toArray();
  console.log("Document found :- \n", findResult);

  // Finding documents with Query Filter
  const xyz = await collection.find({ Course: "BBA" }).toArray();
  const filteredDocs = JSON.stringify(xyz, null, 2);
  console.log(
    `\nFound Documents filtered by { Course: "BBA" } : \n${filteredDocs}`
  );

  // 3️⃣ UPDATE
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

  // 4️⃣ DELETE
  // const deleteDoc = await collection.deleteOne({
  //   College: "Utkal University, BBSR",
  // });

  // ✨✨✨ Other Opeartions ✨✨✨

  // 1️⃣ ADVANCE QUERY OPERATIONS
  // Count all Documents
  const countDoc = await collection.countDocuments({});
  console.log("Documents found: ", countDoc);

  // Count all Documents with filter
  const countDocWithFilt = await collection.countDocuments({
    Age: { $gt: 20 },
    // ⚠️⚠️⚠️ Important ⚠️⚠️⚠️
    // here '$gt' is an Query operator, which Matches values that are greater than a specified value.
    // Query Operators list :- https://www.mongodb.com/docs/manual/reference/operator/query/
  });
  console.log("Counted with Filter : ", countDocWithFilt);

  // Estimate Count (faster for large collections)
  const estdc = await collection.estimatedDocumentCount();
  console.log("Estimate count: ", estdc);

  // 2️⃣ INDEX OPERATIONS
  // Index management
  await collection.createIndex({ email: 1 });
  const indexes = await collection.listIndexes().toArray();
  console.log(indexes);

  return "everything's now ready";
}

callMe()
  .then(console.log)
  .catch((err) => console.log(err))
  .finally(() => client.close());
