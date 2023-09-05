const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

const createProduct = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);

    if (product) {
        res.status(201).json(product);
    } else {
        res.status(400);
        throw new Error("User data is invalid");
    }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
    let query = Product.find({});
    let totCountQuery = Product.find({});




    if (req.query.category) {
        query = query.find({
            category: req.query.category
        });

        totCountQuery = totCountQuery.find({
            category: req.query.category
        });
    }
    if (req.query.brand) {
        query = query.find({
            brand: req.query.brand
        });

        totCountQuery = totCountQuery.find({
            brand: req.query.brand
        });
    }

    if (req.query._sort && req.query._order) {
        query = query.sort({
            [req.query._sort]: req.query._order
        });
    }


    if (req.query._page && req.query._limit) {
        const pageSize = req.query._limit;
        const page = req.query._page;
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    const products = await query.exec();
    const totCount = await totCountQuery.count().exec();


    if (products) {
        res.set('X-Total-Count', totCount);
        res.status(201).json(products);
    } else {
        res.status(400).json({
            'message': 'not found'
        });
    }

});

const fetchProductById = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;

    const product = await Product.findById(id);

    if (product) {
        res.status(201).json(product);
    } else {
        res.status(400).json({
            'message': 'not found'
        });
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true
    });

    if (product) {
        res.status(201).json(product);
    } else {
        res.status(400).json({
            'message': 'not found'
        });
    }
})

module.exports = {
    createProduct,
    fetchAllProducts,
    fetchProductById,
    updateProduct
};