const mongoose = require("mongoose");
const Report = require("./reportModel");
const Schema = mongoose.Schema;

const pieAndDonutSchema = new Schema({
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
isDeleted:{
    type:Boolean,
    default:false
},
deletedAt: {
    type: Boolean,
    default: null,
  }
},
{
    timestamps:true
})

module.exports = mongoose.model("Pie-Donut", pieAndDonutSchema);
