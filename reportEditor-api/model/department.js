const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    description: String,
    teamType: {
        type: String,
        default: '',
        enum: [ 'research-team', 'editing-team' ],
        required:true
    },
    industries: [
        {
            type: Schema.ObjectId,
            ref: 'Industry'
        }
    ],
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