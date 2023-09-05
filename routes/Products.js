const express = require('express');
const {
    createProduct,
    fetchAllProducts,
    updateProduct,
    fetchProductById
} = require('../controller/Product');

const router = express.Router();

router.post('/', createProduct);
router.get('/', fetchAllProducts);
router.patch('/:id', updateProduct);
router.get('/:id', fetchProductById)

exports.router = router;