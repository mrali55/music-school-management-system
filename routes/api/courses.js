const express = require('express');
const router = express.Router();

const Course = require('../../models/Course');
const Student = require('../../models/Student');
const User = require('../../models/User');


router.get('/', (req, res) => {
    console.log('got request!');
Course.find()
        .then(items=> res.json(items))
});

router.get('/:id', (req, res) => {
    Course.findById(req.params.id)
        .then(course => res.json(course))
        .catch(err => res.status(404).json({ success: false }));
});

router.get('/students/:id', (req, res) => {

});

router.post('/add', (req, res) => {
    User.findById(req.body.teacher).then(teacher=>{
        let newCourse=new Course({
            name:req.body.name,
            instrument:req.body.instrument,
            level:req.body.level,
            room:req.body.room,
            start_date:req.body.start_date,
            end_date:req.body.end_date,
            time:req.body.time,
            teacher:teacher,
            students:req.body.students,
            note:req.body.note
        });
        newCourse.save()
            .then(()=>{
                User.update(query, { $push: { courses:newCourse  } }, {new:true}, function(err, doc){
                    if (err) return res.send(500, { error: err });
                    res.json(newCourse);
                });
            });
    });

});

router.post('/enroll', (req, res) => {
    console.log('enroll req.data: ', req.data);

    let newData={
        students:req.body.studentsId
    };
    console.log('newData: ', newData);
    let query = {'_id': req.body.courseId};
    console.log('query: ', query);
    //req.newData.username = req.user.username;

    Course.findOneAndUpdate(query, newData, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');
    });
});

router.post('/edit', (req, res) => {

    let newData={
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
    };
    console.log('newData: ', newData);
    let query = {'_id': req.body};
    console.log('query: ', query);
    //req.newData.username = req.user.username;

    Course.findOneAndUpdate(query, newData, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');
    });
});

router.delete('/:id', (req, res) => {
    Course.findById(req.params.id)
        .then(course => course.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;