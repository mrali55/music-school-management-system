const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    },
    instruments:{
        type:Array
    },
    author: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

module.exports = Student = mongoose.model('student', StudentSchema);