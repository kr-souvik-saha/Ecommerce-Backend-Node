const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');


const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});

    if (categories) {
        res.status(200).json(categories);
    } else {
        res.status(400).json({
            "message": "Not found"
        });
    }
});


const createCategory = asyncHandler(async (req, res) => {
    const category = await Category.create(req.body);

    if (category) {
        res.status(200).json(category);
    } else {
        res.status(400).json({
            "message": "Not found"
        });
    }
})

module.exports = {
    getAllCategories,
    createCategory
};