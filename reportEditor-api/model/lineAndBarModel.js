const mongoose = require("mongoose");
const  Schema = mongoose.Schema;

const lineAndBarSchema = new Schema({
    reportId:{
        type:Schema.ObjectId,
        ref:"Report"
    },
    chartType:{
        type:String,
        enum:["line","bar"]
    },
    name:{
        type:String
    },
    series:[{
        x:String,
        y:String
    }],
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
});

module.exports = mongoose.model("Line-Bar", lineAndBarSchema);