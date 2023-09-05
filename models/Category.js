const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
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

const virtual = categorySchema.virtual('id');
virtual.get(function () {
    return this._id;
});
categorySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (dic, ret) {
        delete ret._id
    }
})

module.exports = mongoose.model("Category", categorySchema);