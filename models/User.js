const {
    Schema
} = require('mongoose');
const mongoose = require('mongoose');


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: Buffer,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    addresses: {
        type: [Schema.Types.Mixed],
        default: []
    },

    name: {
        type: String
    },
    salt: Buffer,
    resetPasswordToken: {
        type: String,
        default: ''
    }

})

const virtual = userSchema.virtual('id');

virtual.get(function () {
    return this._id;
});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (dic, ret) {
        delete ret._id
    }
})

module.exports = mongoose.model('User', userSchema);