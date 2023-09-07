const asyncHandler = require('express-async-handler');
const User = require('../models/User')


const createUser = asyncHandler(async (req, res) => {
    const user = await User.create(req.body);

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(400).json({
            "message": "No Records Found"
        });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body;

    const user = await User.findOne({
        email
    })

    if (!user) {
        res.status(401).json({
            message: 'Invalid user'
        })
    } else {
        if (user.password === password) {
            res.status(200).json({
                id: user.id,
                email: user.email,
                name: user.name,
                addresses: user.addresses,
                role: user.role

            });
        } else {
            res.status(401).json({
                message: 'invalid credentials'
            });
        }
    }
})


module.exports = {
    createUser,
    loginUser
};