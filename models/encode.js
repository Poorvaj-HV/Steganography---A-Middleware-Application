const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const encodeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    originalImage: {
        url: String,
        filename: String
    },
    stegoImage: {
        url: String,
        filename: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// compound index for email + title uniqueness
encodeSchema.index({ email: 1, title: 1 }, { unique: true });

const Encode = mongoose.model('Encode', encodeSchema);
module.exports = Encode;