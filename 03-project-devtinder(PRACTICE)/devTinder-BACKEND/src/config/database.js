const mongoose = require("mongoose");

const connectingDB = async () => {
  await mongoose.connect(
    "mongodb+srv://devTinder-DB:fzXGIEG5JCkItaOZ@devtinder.yzcimn0.mongodb.net/"
  );
};

connectingDB()
  .then(console.log("Connection to DB successful "))
  .catch((err) => console.log(err))
  .finally(mongoose.disconnect());
