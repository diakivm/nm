const { Schema, model } = require('mongoose');

const transactionSchema = new Schema({
    hash: {
        type: String,
        required: true,
        unique: true,
    },
    blockNumber: {
        type: Number,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Number,
        required: true,
    },
    confirmations: {
        type: Number,
        required: true,
        default: 0,
    },
});

module.exports = model('Transaction', transactionSchema);
