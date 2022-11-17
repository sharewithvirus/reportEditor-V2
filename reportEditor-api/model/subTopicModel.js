const mongoose = require("mongoose");
const Report = require("./reportModel");

const subTopicModel = new mongoose.Schema(
  {
    subTopicsName: {
      type: String,
    },
    slug: {
      type: String,
    },
    index: {
      type: String,
    },
    parentReport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
    },
    parentSubTopic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubTopic",
    },
    subTopics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubTopic",
      },
    ],
    htmlData: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const SubTopic = mongoose.model("SubTopic", subTopicModel);

module.exports = SubTopic;