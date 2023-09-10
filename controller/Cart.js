const asyncHandler = require('express-async-handler');
const Cart = require('../models/Cart');


const fetchCartByUser = asyncHandler(async (req, res) => {
    const {
        id
    } = req.user;


    const cart = await Cart.find({
        user: id
    }).populate('product');

    if (cart) {
        res.status(200).json(cart);
    } else {
        res.status(400).json({
            message: "Data not found"
        });
    }
});

const addToCart = asyncHandler(async (req, res) => {

    try {
        const {
            id
        } = req.user;
        const cart = new Cart({
            ...req.body,
            user: id
        });
        const doc = await cart.save();
        const result = await doc.populate('product');
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json(err);
    };
});

const deleteFromCart = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;

    const result = await Cart.findByIdAndDelete(id);

    if (result) {
        res.status(200).json(result);
    } else {
        res.status(400).json({
            message: "Data not found"
        });
    }
});

const updateCart = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;

    const cart = await Cart.findByIdAndUpdate(id, req.body);
    const updatedCart = await Cart.findById(id)
    const result = await updatedCart.populate('product');

    if (result) {
        res.status(200).json(result);
    } else {
        res.status(400).json({
            message: 'No result found'
        });
    }
})

module.exports = {
    fetchCartByUser,
    addToCart,
    deleteFromCart,
    updateCart
};