const asyncHandler = require('express-async-handler');
const User = require('../models/User')




const fetchUserById = asyncHandler(async (req, res) => {

    const {
        id
    } = req.user;
    try {
        const user = await User.findById(id);
        res.status(200).json({
            id: user.id,
            addresses: user.addresses,
            email: user.email,
            role: user.role
        });
    } catch (err) {
        res.status(400).json(id);
    }

});

const updateUser = asyncHandler(async (req, res) => {
    const {
        id
    } = req.user;

    const user = await User.findByIdAndUpdate(id, req.body);
    const updatedUser = await User.findById(id);

    if (updatedUser) {
        res.status(200).json(updatedUser);
    } else {
        res.status(400).json({
            "message": "No Records Found"
        });
    }
})

module.exports = {

    fetchUserById,
    updateUser
};