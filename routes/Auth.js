const express = require('express');
const {
    loginUser,
    createUser,
    checkUser,
    resetPasswordRequest,
    resetPassword,
    logout
} = require('../controller/Auth');
const passport = require('passport');

const router = express.Router();

router.post('/login', passport.authenticate('local'), loginUser);
router.get('/check', passport.authenticate('jwt'), checkUser);
router.post('/signup', createUser);
router.post('/reset-password-request', resetPasswordRequest);
router.post('/reset-password', resetPassword);
router.get('/logout', logout)

exports.router = router;