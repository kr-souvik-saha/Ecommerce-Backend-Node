const asyncHandler = require('express-async-handler');
const User = require('../models/User')




const fetchUserById = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;
    const user = await User.findById(id);

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(400).json({
            "message": "No Records Found"
        });
    }
});

const updateUser = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;

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