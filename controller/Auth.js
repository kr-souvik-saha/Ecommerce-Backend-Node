const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const crypto = require('crypto');
const {
    sanitizeUser,
    sendMail
} = require('../services/common');
const SECRET_KEY = 'SECRET_KEY';
const jwt = require('jsonwebtoken');


const createUser = asyncHandler(async (req, res) => {

    try {
        const salt = crypto.randomBytes(16);
        crypto.pbkdf2(
            req.body.password,
            salt,
            310000,
            32,
            'sha256',
            async function (err, hashedPassword) {
                const user = new User({
                    ...req.body,
                    password: hashedPassword,
                    salt
                });
                const doc = await user.save();

                req.login(sanitizeUser(doc), (err) => { // this also calls serializer and adds to session
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        const token = jwt.sign(sanitizeUser(doc), SECRET_KEY);
                        res.cookie('jwt', token, {
                                expires: new Date(Date.now() + 3600000),
                                httpOnly: true,
                            })
                            .status(201)
                            .json(token);
                    }
                });
            }
        );
    } catch (err) {
        res.status(400).json(err);
    }
});

const loginUser = asyncHandler(async (req, res) => {

    const user = req.user;
    res
        .cookie('jwt', user.token, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
        })
        .status(201)
        .json({
            id: user.id,
            role: user.role
        });
})


const checkUser = async (req, res) => {
    res.json({
        status: 'success',
        user: req.user
    });
};

const resetPasswordRequest = async (req, res) => {
    const email = req.body.email;

    const user = await User.findOne({
        email: email
    });
    if (user) {
        const token = crypto.randomBytes(48).toString('hex');
        user.resetPasswordToken = token;
        await user.save()

        const resetPageLink = 'http://localhost:3000/reset-password?token=' + token + '&email=' + email;
        const subject = "reset password for E-commerce"
        const html = `<p>Click href='${resetPageLink}'</p>`

        if (email) {


            const response = await sendMail({
                to: email,
                subject,
                html
            });
            res.json(response)
        } else {

        }
    } else {

    }



}

const resetPassword = async (req, res) => {
    const {
        email,
        password,
        token
    } = req.body;

    const user = await User.findOne({
        email: email,
        resetPasswordToken: token
    });
    if (user) {
        const salt = crypto.randomBytes(16);
        crypto.pbkdf2(
            password,
            salt,
            310000,
            32,
            'sha256',
            async function (err, hashedPassword) {
                user.password = hashedPassword;
                user.salt = salt;
                await user.save();
                const subject = 'password successfully reset for e-commerce';
                const html = `<p>Successfully able to Reset Password</p>`;
                if (email) {
                    const response = await sendMail({
                        to: email,
                        subject,
                        html
                    });
                    res.json(response);
                } else {
                    res.sendStatus(400);
                }
            }
        );
    } else {
        res.sendStatus(400);
    }
}

const logout = async (req, res) => {
    res
        .cookie('jwt', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        .sendStatus(200)
}


module.exports = {
    createUser,
    loginUser,
    checkUser,
    resetPasswordRequest,
    resetPassword,
    logout
};