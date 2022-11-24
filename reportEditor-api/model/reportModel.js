const mongoose = require("mongoose");
const SubTopic = require("./subTopicModel");

const reportModel = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    reportStatusEditing: {
      type: String,
      default: "drafting",
      enum: [
        null,
        "draftRecived",
        "draftAccepted",
        "editingVersionDone",
        "transferredToResearch",
      ],
    },
    reportStatusResearch: {
      type: String,
      default: "drafting",
      enum: [
        null,
        "drafting",
        "forwardedToEditing",
        "editingVersionDone",
        "researchedPublished",
      ],
    },
    userList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    industry: {
      type: String,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    template: {
      type:String,
    },
    
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportModel);

module.exports = Report;





