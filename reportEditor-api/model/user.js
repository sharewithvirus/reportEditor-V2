const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: String,
    email: String,
    password: String,
    isAdmin:{
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    activity: {
        type: Schema.ObjectId,
        ref: 'Activity'
    },
    department: {
        type: Schema.ObjectId,
        ref: 'Department'
    }
},{
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema);