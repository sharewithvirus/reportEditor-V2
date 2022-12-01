const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const industrySchema = new Schema({
    name:{
        type:String
    },
    status:{
        type:Boolean,
        default:false
    },
    deletedAt:{
        type:Date,
        default:null
    },

},
{timestamps:true});

module.exports = mongoose.model("Industry", industrySchema);