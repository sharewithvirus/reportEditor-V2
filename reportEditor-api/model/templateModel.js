const mongoose = require("mongoose");

const templateSchema= new mongoose.Schema(
  {
    name: {
      type: String,
    },
    editor: {
      type: String,
    },
    url: {
      type:String
    },
    logoAlignment: {
      type: String,
    },
    header: {
      type: String,
    },
    footer: {
      type: String,
    },
    body: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
