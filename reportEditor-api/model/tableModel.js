const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tableSchema = new Schema({
    reportId:{
        type:Schema.ObjectId,
        ref:"Report"
    },
    name:{
        type:String,
    },
    rowData:String,
    isDeleted:{
        type:Boolean,
        default:false
    },
    deletedAt:{
        type:Date,
        default:null
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Table",tableSchema);
