const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    activityType:{
        type: String,
        enum: [ "Login", "Logout" ]
    },
    ipAddress: {
        type: String,
        default: "0.0.0.0",
    },
    
},
{
    timestamps: true,
})

module.exports = mongoose.model('Activity', activitySchema);