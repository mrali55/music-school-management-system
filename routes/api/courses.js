const express = require('express');
const router = express.Router();

const Course = require('../../models/Course');

router.get('/', (req, res) => {
    Course.find()
        .then(items=> res.json(items))
});

router.post('/add', (req, res) => {
    const newCourse=new Course({
        name:req.body.name,
        instrument:req.body.instrument,
        level:req.body.level,
        room:req.body.room,
        start_date:req.body.start_date,
        end_date:req.body.end_date,
        time:req.body.time,
        teacher:req.body.teacher,
        students:req.body.students,
        note:req.body.note
    });
    newCourse.save()
        .then(course=>res.json(course));
});

router.delete('/:id', (req, res) => {
    Course.findById(req.params.id)
        .then(course => course.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;