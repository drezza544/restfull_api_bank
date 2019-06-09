const mongoose = require('mongoose');
const MutasiModel = mongoose.Schema({
    user_id: Number,
    tanggal: Date,
    type: String,
    nominal: Number,
    description: String,
});

module.exports = mongoose.model('mutasi', MutasiModel, 'mutasi');