const express = require('express');
const router = express.Router();

const User = require('../../models/User');

router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // Simple validation
    if(!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }


});

module.exports = router;