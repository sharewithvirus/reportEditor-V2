const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema({
    reportId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Report"
    },
    chartType:{
        type:String,
        enum:["area"]
    },
    chartName:{
        type:String
    },
    series:[
        {
        name:String,
        data:[Number]
    }],
    labels:[String],

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

module.exports = mongoose.model("Area", areaSchema);