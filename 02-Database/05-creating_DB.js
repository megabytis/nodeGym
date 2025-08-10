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
const dbname = "myDataBase";

async function callMe() {
  await client.connect();
  console.log("Client connected successfully");

  //   after client connect, we'll create an database
  const db = client.db(dbname);

  // Now i'll add documents/data to my database
  const collection = db.collection("documents");

  return "everything's now ready";
}

callMe()
  .then(console.log)
  .catch((err) => console.log(err))
  .finally(() => client.close());
