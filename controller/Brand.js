const asyncHandler = require('express-async-handler');
const Brand = require('../models/Brand');


const fetchAllBrands = asyncHandler(async (req, res) => {
    const brands = await Brand.find({});

    if (brands) {
        res.status(200).json(brands);
    } else {
        res.status(400).json({
            "message": "error"
        });
    }
});

const createBrand = asyncHandler(async (req, res) => {
    const brand = await Brand.create(req.body);

    if (brand) {
        res.status(200).json(brand);
    } else {
        res.status(400).json({
            "message": "error"
        });
    }
})


module.exports = {
    fetchAllBrands,
    createBrand
};