const UserModel = require('../Model/UserModel');
const ActivationModel = require('../Model/ActivationModel');

exports.show = async(req, res) => {
    const getAllUser = await UserModel.find();
    const activation_Card = await ActivationModel.find();
    res.status(200).json({
        status: true,
        code: 200,
        user: {
            getAllUser,
            activation_Card,
        }
    });
}

exports.getById = async(req, res) => {
    const { user_id } = req.params;
    const checkUserId = await UserModel.find({ user_id: user_id });
    const activation_Card = await ActivationModel.find({ user_id: user_id });

    res.status(200).json({
        status: true,
        code: 200,
        data: {
            checkUserId,
            activation_Card,
        }
    });
}

exports.update = async(req, res) => {
    const { user_id } = req.params;
    const { nama, email, password, alamat, tgl_lahir, phone, password_transaksi, pin, saldo } = req.body;
    const checkUserId = await UserModel.find({ user_id: user_id });

    if(checkUserId.length > 0) {
        const updateUser = await UserModel.updateOne({ user_id: user_id }, { 
            nama: nama, 
            email: email, 
            password: password, 
            profile: [
                {
                    alamat: alamat, 
                    tgl_lahir: tgl_lahir, 
                    phone: phone, 
                    saldo: saldo,
                }
            ],
            pin: [
                {
                    password_transaksi: password_transaksi, 
                    pin: pin, 
                }
            ]
        });
        if(updateUser) {
            return res.status(200).json({
                status: true,
                code: 200,
                message: "Data Berhasil Diubah",
                data: {
                    user_id,
                }
            });
        }
        res.status(400).json({
            status: false,
            code: 400,
            message: "Data Gagal Diubah"
        });
    }else {
        res.status(400).json({
            status: false,
            code: 400,
            message: "User " + user_id + " Tidak dapat ditemukan"
        });
    }
}

exports.delete = async(req, res) => {
    const { user_id } = req.params;
    const checkUserId = await UserModel.find({ user_id: user_id });

    if(checkUserId.length > 0) {
        const deleteUser = await UserModel.remove({ user_id: user_id });
        if(deleteUser) {
            return res.status(200).json({
                status: true,
                code: 200,
                message: "Data Berhasil Dihapus",
                data: {
                    user_id,
                }
            });
        }
        res.status(400).json({
            status: false,
            code: 400,
            message: "Data Gagal Dihapus"
        });
    }else {
        res.status(400).json({
            status: false,
            code: 400,
            message: "User " + user_id +  " Tidak dapat ditemukan"
        });
    }
}