const express = require('express');
const router = express.Router();
const passport=require('passport');
const { forwardAuthenticated ,ensureAuthenticated} = require('../../config/auth');
const User = require('../../models/User');
const Student = require('../../models/Student');
const bcrypt = require('bcryptjs');

router.get('/',ensureAuthenticated, (req, res) => {
    User.find()
        .then(items=> res.json(items))
});

router.get('/logout', (req, res) => {
    req.logout();
    res.json({status:'success'});
});

router.get('/teachers', (req, res) => {
    User.find({"role":"teacher"}).sort({_id:-1})
        .then(items=> res.json(items))
});

router.get('/check-login', (req, res) => {
    User.findById(req.user)
        .then(() => res.json(req.user))
        .catch(err => res.status(404).json({ success: false }));
    return req.user;
});

router.post('/', (req, res) => {
    console.log('in post request at /')
    const newUser=new User({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password,
        instruments:req.body.instruments,
        role:req.body.role
    });

    //HASH USER PASS
    bcrypt.genSalt(10,(err,salt)=>
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
        if(err){
            throw err;
        }
        newUser.password=hash;
            newUser.save()
                .then(user=>res.json(user))
                .catch((e)=>{
                    res.status(400).end();
                    console.log('add user error : ',e)
                });
    }));


});

router.post('/students', (req, res) => {
    console.log('student params: ', req.body);
    let query = {'_id':req.user._id};
    const newStudent=new Student({
        name:req.body.name,
        instruments:req.body.instruments,
        user:req.user._id
    });

    newStudent.save()
        .then(()=>{
            User.update(query, { $push: { students:newStudent  } }, {new:true}, function(err, doc){
                if (err) return res.send(500, { error: err });
                return res.send("succesfully saved");
            });
        });

});

router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

router.post('/many', (req, res) => {
    console.log('many | req: ',req.body);
    Student.find({_id:{$in:req.body}})
        .then(items=> res.json(items))
});





router.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        res.redirect('/api/users/check-login');
    });



router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));


module.exports = router;