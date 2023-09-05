const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cant be lower than 0'],
        default: 0
    },
    discountPercentage: {
        type: Number,
        required: [true, 'Discount percentage is required'],
        min: [0, 'Discount cant be lower than 0%'],
        max: [100, 'Discount cant be more then 100%'],
        default: 0
    },
    rating: {
        type: Number,
        required: [true, 'Title is required'],
        min: [1, 'Rating cant be less than 1'],
        max: [5, 'Rating cant be more than 5'],
        default: 5
    },
    stock: {
        type: Number,
        required: [true, 'Title is required'],
        min: [0, 'Stock cant be less than 0'],
        default: 0
    },
    brand: {
        type: String,
        required: [true, 'Stock is required'],
    },
    category: {
        type: String,
        required: [true, 'Stock is required'],
    },
    thumbnail: {
        type: String,
        required: [true, 'Thumbnail is required']
    },
    images: {
        type: [String],
        require: [true, 'Images are required']
    },
    deleted: {
        type: Boolean,
        default: false
    }

})

const virtual = productSchema.virtual('id');
virtual.get(function () {
    return this._id;
});
productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (dic, ret) {
        delete ret._id
    }
})


module.exports = mongoose.model("Product", productSchema);