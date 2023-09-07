const express = require('express');
const {
    createOrder,
    updateOrder,
    fetchOrdersByUser,
    deleteOrder,
    fetchAllOrders
} = require('../controller/Order');

const router = express.Router();


router.get('/user', fetchOrdersByUser);
router.post('/', createOrder);
router.patch('/:id', updateOrder);
router.delete('/:id', deleteOrder);
router.get('/', fetchAllOrders)

exports.router = router;