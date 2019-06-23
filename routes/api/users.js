const express = require('express');
const router = express.Router();
const passport=require('passport');
const { forwardAuthenticated ,ensureAuthenticated} = require('../../config/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

router.get('/',ensureAuthenticated, (req, res) => {
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

    //HASH USER PASS
    bcrypt.genSalt(10,(err,salt)=>
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
        if(err){
            throw err;
        }
        newUser.password=hash;
            newUser.save()
                .then(user=>res.json(user));
    }));


});

router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});




router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/users',
        failureRedirect: '/users/testing'
    })(req, res, next);
});

router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));


module.exports = router;