const express = require('express');
const router = express.Router();

const Student = require('../../models/Student');

router.get('/', (req, res) => {
    Student.find()
        .then(items=> res.json(items))
});

router.post('/', (req, res) => {
    console.log('req==>: ', req.user);
    const newStudent=new Student({
        name:req.body.name,
        instruments:req.body.instruments
    });
    newStudent.save()
        .then(user=>res.json(user));
});

router.post('/:id', (req, res) => {
    console.log('req==>: ', req.user);
    const newStudent=new Student({
        name:req.body.name,
        instruments:req.body.instruments
    });
    newStudent.save()
        .then(user=>res.json(user));
});

router.delete('/:id', (req, res) => {
    Student.findById(req.params.id)
        .then(user => user.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;