const mongoose = require('mongoose');
const TransferModel = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    transfer_id: Number,
    user_id: Number,
    rekening_tujuan: Number,
    bank_id: Number,
    nominal: Number,
    password_transaksi: String,
});

module.exports = mongoose.model('transfer', TransferModel, 'transfer');