const TransferModel = require('../Model/TransferModel');
const UserModel = require('../Model/UserModel');
const BankModel = require('../Model/BankModel');

exports.store = async(req, res) => {
    const { user_id, bank_id, rekening_tujuan, nominal, password_transaksi } = req.body;
    const generated_id = Math.floor((Math.random() * 99999999) + 0);

    if(!user_id || !bank_id || !rekening_tujuan || !nominal || !password_transaksi) {
        res.status(400).json({
            status: false,
            code: 400,
            message: "Invalid Request"
        });
    }
    
    const createTransfer = await TransferModel.create({
        user_id: user_id,
        bank_id: bank_id,
        rekening_tujuan: rekening_tujuan,
        nominal: nominal,
        password_transaksi: password_transaksi,
    });

    if(createTransfer) {
        return res.status(200).json({
            status: true,
            code: 200,
            message: "Berhasil Transfer",
            data: {
                createTransfer,
            }
        });
    }
    res.status(400).json({
        status: false,
        code: 400,
        message: "Gagal Transfer"
    });
}