const express = require('express');
const router =express.Router();

const { ensureAuthenticated, forwardAuthenticated } = require('../../config/auth');


router.get('/', (req, res) =>
    res.json( {
        user: "unauthorized"
    })
);



module.exports = router;