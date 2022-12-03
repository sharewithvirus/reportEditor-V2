const mongoose = require("mongoose");
const Report = require("./reportModel");

const subTopicModel = new mongoose.Schema(
  {
    subTopicName: {
      type: String,
    },
    chapterName: {
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
    deletedAt: {
      type: Date,
      default: null,
    }
  },
  {
    timestamps: true,
  }
);

const SubTopic = mongoose.model("SubTopic", subTopicModel);

module.exports = SubTopic;
