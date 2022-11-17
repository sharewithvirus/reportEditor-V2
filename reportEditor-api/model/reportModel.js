const mongoose = require("mongoose");
const SubTopic = require("./subTopicModel");

const reportModel = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    userList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    industry: {
      type: String,
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      // ref: "",
    },
    subTopics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubTopic",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportModel);

module.exports = Report;