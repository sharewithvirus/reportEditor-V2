const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name: String,
    department: {
        type: Schema.ObjectId,
        ref: "Department"
    },
    access: {
        type: String,
        default: "read",
        enum: ["read", "write", "read_write"]
    },
    status: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('Role', roleSchema);