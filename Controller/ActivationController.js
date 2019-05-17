const ActivationModel = require('../Model/ActivationModel');

exports.store = async (req, res) => {
    const { user_id, bank_id, nama_user, nomor_kartu } = req.body;
    const checkNomorKartu = await ActivationModel.find({ nomor_kartu: nomor_kartu });

    if(!user_id || !bank_id || !nama_user || !nomor_kartu) {
        res.status(400).json({
            status: true,
            code: 400,
            message: "Invalide Request"
        });
    }
    if(checkNomorKartu.length > 0) {
        return res.status(400).json({
            status: false,
            code: 400,
            message: "Nomor Kartu Telah Dipakai Customer Lain"
        });
    }else {
        const createActivation = await ActivationModel.create({
            user_id: user_id,
            bank_id: bank_id,
            nama_user: nama_user,
            nomor_kartu: nomor_kartu,
        });

        if(createActivation) {
            return res.status(200).json({
                status: true,
                code: 200,
                message: "Berhasil Di Aktifasi Kartu",
                data: {
                    createActivation,
                }
            });
        }
        res.status(400).json({
            status: false,
            code: 400,
            message: "Gagal Aktifasi Kartu"
        });
    }
}

exports.show = async(req, res) => {
    const getAllActivation = await ActivationModel.find();
    res.status(200).json({
        status: true,
        code: 200,
        data: {
            getAllActivation,
        }
    });
}