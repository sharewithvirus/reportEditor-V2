const mongoose = require("mongoose")
const DB = process.env.DATABASE;

exports.dbConnect = async () => {
    mongoose
      .connect(DB)
      .then(() => console.log("MongoDB connection is successful!"))
      .catch((e) => {
        console.log(`SomeThing went wrong with MongoDB DataBase and the error is =  ${e}`);
      });
}
