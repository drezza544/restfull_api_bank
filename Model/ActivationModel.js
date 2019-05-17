const mongoose = require('mongoose');
const ActivationMode = new mongoose.Schema({
    user_id: Number,
    bank_id: Number,
    nama_user: String,
    nomor_kartu: Number,
});

module.exports = mongoose.model('activation', ActivationMode, 'activation');