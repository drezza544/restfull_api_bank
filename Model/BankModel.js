const mongoose = require('mongoose');
const BankModel = new mongoose.Schema({
    bank_id: Number,
    nama: String,
    transfer_nonbank_cost: String,
});

module.exports = mongoose.model('bank', BankModel, 'bank');