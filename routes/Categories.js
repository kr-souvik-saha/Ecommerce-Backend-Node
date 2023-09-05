const express = require('express');
const {
    getAllCategories,
    createCategory
} = require('../controller/Category');

const router = express.Router();


router.get('/', getAllCategories);
router.post('/', createCategory)

exports.router = router;