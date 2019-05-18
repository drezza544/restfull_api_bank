const mongoose = require('mongoose');
const BankModel = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    bank_id: Number,
    nama: String,
    transfer_nonbank_cost: Number,
});

module.exports = mongoose.model('bank', BankModel, 'bank');