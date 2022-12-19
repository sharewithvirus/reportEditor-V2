const mongoose = require("mongoose");
const SubTopic = require("./subTopicModel");

const reportModel = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    reportStatusEditing: {
      type: [String],
      default: ["drafting"],
      enum: [
        "drafting",
        "draftRecived",
        "draftAccepted",
        "editingVersionDone",
        "transferredToResearch",
      ],
    },
    reportStatusResearch: {
      type: [String],
      default: ["drafting"],
      enum: [
        null,
        "drafting",
        "forwardedToEditing",
        "editingVersionDone",
        "researchedPublished",
      ],
    },
    userList:{
      type:[String]
    },
    industry: {
      type: [String],
    },
    baseYear:{
      type:String
    },
    forecastYear:{
      type:String
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template"
    },
    subTopics:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubTopic",
      },
    ],
    reportImages:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Images",
      },
    ],
    reportTables:[
      {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Images",
        type: String,
      }
    ],
    reportCharts:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chart",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportModel);

module.exports = Report;





