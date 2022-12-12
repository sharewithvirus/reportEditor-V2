const mongoose = require("mongoose");

const multibarSchema = new mongoose.Schema({
    reportId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Report"
    },
    chartType:{
        type:String,
        enum:["multibar"]
    },
    chartName:{
        type:String
    },
    series:[
        {
        data:[Number]
    }],
    categories:[String],

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

module.exports = mongoose.model("Multibar", multibarSchema);