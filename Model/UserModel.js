const mongoose = require('mongoose');
const UserModel = new mongoose.Schema({
    api_key: String,
    user_id: Number,
    nama: String,
    email: String,
    password: String,
    profile: [
        {
            alamat: String,
            tgl_lahir: Date,
            phone: String,
            saldo: String,
        }
    ],
    pin: [
        {
            password_transaksi: String,
            pin: {type: String, max: 6}
        }
    ]
    
});

module.exports = mongoose.model('user', UserModel, 'user');