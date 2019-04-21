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
        password:req.body.password
    });
    newUser.save()
        .then(user=>res.json(user));
});

module.exports = router;