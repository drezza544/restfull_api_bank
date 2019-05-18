const mongoose = require('mongoose');
const UserModel = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    api_key: String,
    user_id: Number,
    nama: String,
    email: String,
    password: String,
    profile: [
        {
            alamat: String,
            tgl_lahir: Date,
            phone: Number,
            saldo: Number,
        }
    ],
    pin: [
        {
            password_transaksi: String,
            pin: {type: Number}
        }
    ]
    
});

module.exports = mongoose.model('user', UserModel, 'user');