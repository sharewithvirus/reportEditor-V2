const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    activityType: String,
    ipAddress: String,
    
},
{
    timestamps: true,
})

module.exports = mongoose.model('Activity', activitySchema);