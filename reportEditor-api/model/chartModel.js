const mongoose = require("mongoose");
const  Schema = mongoose.Schema;

const chartSchema = new Schema({
    reportId:{
        type:Schema.ObjectId,
        ref:"Report"
    },
    chartType:{
        type:String,
        enum:[ "pie","donut","line","bar","radar","stacked","multibar","area","barandline", "mixed"],
        required:true
    },
    name: {
        type: String
    },
    formChartData:{  
        type: Object
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
});

module.exports = mongoose.model("Chart", chartSchema);