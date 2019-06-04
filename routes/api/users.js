const express = require('express');
const router = express.Router();

const User = require('../../models/User');

router.get('/', (req, res) => {
    User.find()
        .then(items=> res.json(items))
});

router.post('/', (req, res) => {
    const newUser=new User({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password,
        instruments:req.body.instruments
    });
    newUser.save()
        .then(user=>res.json(user));
});

router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;