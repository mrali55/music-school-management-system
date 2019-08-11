const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/courses', require('./courses'));
router.use('/students', require('./student'));
router.use('/test', require('./test'));

module.exports = router;