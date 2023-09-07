const express = require('express');
const {
    loginUser,
    createUser
} = require('../controller/Auth');

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', createUser)

exports.router = router;