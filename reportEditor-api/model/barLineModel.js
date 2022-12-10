const mongoose = require("mongoose");

const barLineSchema = new mongoose.Schema({
    reportId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Report"
    },
    chartName:{
        type:String
    },
    series:[
        {
        name:String,
        chartType:{
            type:String,
            enum:["column","line"]
        },
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

module.exports = mongoose.model("BarLine", barLineSchema);