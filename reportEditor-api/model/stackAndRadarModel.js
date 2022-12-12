const mongoose = require("mongoose");

const stackAndRadarSchema = new mongoose.Schema({
    reportId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Report"
    },
    chartType:{
        type:String,
        enum:["stack","radar"]
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

module.exports = mongoose.model("Stack-Radar", stackAndRadarSchema);