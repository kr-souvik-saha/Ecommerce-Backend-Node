const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');

const fetchOrdersByUser = asyncHandler(async (req, res) => {
    const {
        id
    } = req.user;



    try {
        const orders = await Order.find({
            user: id
        });
        res.status(200).json(orders);

    } catch (err) {
        res.status(400).json(
            err
        );
    }
});

const createOrder = asyncHandler(async (req, res) => {

    try {
        const order = new Order(req.body);

        const result = await order.save();

        res.status(200).json(result);

    } catch (err) {
        res.status(400).json(
            err
        );
    }
});

const deleteOrder = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;



    try {
        const order = await Order.findByIdAndDelete(id);
        res.status(200).json(orders);

    } catch (err) {
        res.status(400).json(
            err
        );
    }


});

const updateOrder = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;

    const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
    })

    try {
        const orders = await Order.findByIdAndUpdate(id, req.body, {
            new: true,
        })
        res.status(200).json(orders);

    } catch (err) {
        res.status(400).json(
            err
        );
    }

});

const fetchAllOrders = asyncHandler(async (req, res) => {
    let query = Order.find({
        deleted: {
            $ne: true
        }
    });
    let totalOrdersQuery = Order.find({
        deleted: {
            $ne: true
        }
    });


    if (req.query._sort && req.query._order) {
        query = query.sort({
            [req.query._sort]: req.query._order
        });
    }

    const totalDocs = await totalOrdersQuery.count().exec();

    if (req.query._page && req.query._limit) {
        const pageSize = req.query._limit;
        const page = req.query._page;
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    try {
        const docs = await query.exec();
        res.set('X-Total-Count', totalDocs);
        res.status(200).json(docs);
    } catch (err) {
        res.status(400).json(err);
    }

})

module.exports = {
    fetchOrdersByUser,
    createOrder,
    deleteOrder,
    updateOrder,
    fetchAllOrders
};