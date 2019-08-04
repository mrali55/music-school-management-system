const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CourseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    instrument: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: String
    },
    time:{
        type:Array
    },
    teacher:{
        type:String
    },
    students:{
        type:Array
    },
    note:{
        type:String
    }
});

module.exports = Course = mongoose.model('course', CourseSchema);