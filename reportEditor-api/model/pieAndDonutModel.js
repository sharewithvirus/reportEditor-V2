const mongoose = require("mongoose");
const Report = require("./reportModel");

const pieAndDonutSchema = new mongoose.Schema({
reportId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:Report
},
chartType:{
    type:String,
    enum:["pie","donut"]
},
name:{
    type:"string"
},
labels:{
    type:[String]
},
series:{
    type:[Number]
},
isDeleted: {
    type: Boolean,
    default: false
  },
deletedAt: {
    type: Date,
    default: null,
  }
},
{
    timestamps:true
})

module.exports = mongoose.model("Pie-Donut", pieAndDonutSchema);
