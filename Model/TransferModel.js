const mongoose = require('mongoose');
const TransferModel = new mongoose.Schema({
    transfer_id: Number,
    user_id: Number,
    rekening_tujuan: String,
    bank_id: Number,
    nominal: String,
    password_transaksi: String,
});

module.exports = mongoose.model('transfer', TransferModel, 'transfer');