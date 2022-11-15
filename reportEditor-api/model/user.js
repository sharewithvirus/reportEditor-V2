const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: String,
    email: String,
    password: String,
    userStatus: {
        type: Boolean,
        default: true,
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
    emailVerified:{
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    activity: [
        {
            type: Schema.ObjectId,
            ref: 'Activity'
        }
    ],
    department: {
        type: Schema.ObjectId,
        ref: 'Department'
    },
    access: {
        type: Schema.ObjectId,
        ref: 'Role'
    }
},{
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema);