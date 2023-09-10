const express = require('express');
const {
    loginUser,
    createUser,
    checkUser
} = require('../controller/Auth');
const passport = require('passport');

const router = express.Router();

router.post('/login', passport.authenticate('local'), loginUser);
router.get('/check', passport.authenticate('jwt'), checkUser);
router.post('/signup', createUser)

exports.router = router;