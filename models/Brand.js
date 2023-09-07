const mongoose = require('mongoose');
const {
    Schema
} = mongoose

const brandSchema = new Schema({
    label: {
        type: String,
        required: [true, 'Brand label is required'],
        unique: [true, 'Brand label shuld be unique']
    },
    value: {
        type: String,
        required: [true, 'Brand value is required'],
        unique: [true, 'Brand value shuld be unique']
    }
})

const virtuals = brandSchema.virtual('id')
virtuals.get(function () {
    return this._id
});
brandSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (dic, ret) {
        delete ret._id
    }
})

module.exports = mongoose.model('Brand', brandSchema);