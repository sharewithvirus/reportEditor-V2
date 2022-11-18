const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    name: String,
    description: String,
    teamType: {
        type: String,
        default: '',
        enum: [ 'research-team', 'editing-team' ]
    },
    deletedAt:{
        type: Date,
        default: null
    },
    status: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('Department', departmentSchema);