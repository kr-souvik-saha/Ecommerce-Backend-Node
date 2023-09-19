const passport = require('passport');
const nodemailer = require('nodemailer');

exports.isAuth = (req, res, done) => {
    return passport.authenticate('jwt')
};

exports.sanitizeUser = (user) => {
    return {
        id: user.id,
        role: user.role
    }
}

exports.cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    console.log('token' + token);
    return token;
};

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "souviksaha1606@gmail.com",
        pass: process.env.MAIL_PASSWORD,
    },
});

exports.sendMail = async function ({
    to,
    subject,
    text,
    html
}) {
    let info = await transporter.sendMail({
        from: '"E-commerce" <souviksaha1606@gmail.com>', // sender address
        to,
        subject,
        text,
        html
    });
    return info;
}