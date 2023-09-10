const passport = require('passport');

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
    //TODO : this is temporary token for testing without cookie
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmQ2OGQ2YTI1NTYzOWFmYWY2ZjQzOSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5NDM2NTU1OH0.YdWC-kyQP12VhD3hpj-yzmXXrMoq5_fq_5vVAIIgW1E"
    return token;
};