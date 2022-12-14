const mongoose = require("mongoose");
const  Schema = mongoose.Schema;

const imagesSchema = new Schema({
    reportId:{
        type:Schema.ObjectId,
        ref:"Report"
    },
    name:String,
    key: String,
    imgUrl: String,
    deletedAt: {
        type: Date,
        default: null,
      }
},
{
    timestamps:true
});

module.exports = mongoose.model("Images", imagesSchema);