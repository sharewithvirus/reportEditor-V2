const mongoose = require("mongoose")
const DB = process.env.DATABASE;

exports.dbConnect = async () => {
    mongoose
      .connect(DB)
      .then(() => console.log("DB connection successful!"))
      .catch((e) => {
        console.log(`SomeThing went wrong with DataBase. and the error is =  ${e}`);
      });
}
