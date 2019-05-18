const UserModel = require('../Model/UserModel');

exports.store = async (req, res) => {
    const { nama, email, password, confirm_password, alamat, tgl_lahir, phone, password_transaksi, pin } = req.body;
    const checkEmail = await UserModel.find({ email: email });
    const checkPhone = await UserModel.find({ phone: phone });

    if(!nama || !email || !password || !confirm_password || !alamat || !tgl_lahir || !phone || !password_transaksi || !pin) {
        return res.status(400).json({
            status: false,
            code: 400,
            message: "Invalid Request"
        });
    };
    if(checkEmail > 0) {
        return res.status(400).json({
            status: false,
            code: 400,
            message: "Email Telah Dipakai"
        });
    }else if(checkPhone > 0) {
        return res.status(400).json({
            status: false,
            code: 400,
            message: "Phone Telah Dipakai"
        });
    }else if(password != confirm_password) {
        return res.status(400).json({
            status: false,
            code: 400,
            message: "Password Tidak Sama"
        });
    }else {
        const createUser = await UserModel.create({
            _id: mongooseObjectId,
            api_key: generated_apiKey(25),
            user_id: generated_id,
            nama: nama,
            email: email,
            password: password,
            profile: [
                {
                    alamat: alamat,
                    tgl_lahir: tgl_lahir,
                    phone: phone,
                    saldo: 0
                }
            ],
            pin: [
                {
                    pin: pin,
                    password_transaksi: password_transaksi,
                }
            ]
        });

        if(createUser) {
            return res.status(200).json({
                status: true,
                code: 200,
                message: "Berhasil Register",
                data: [
                    createUser
                ],
            });
        }

        return res.status(400).json({
            status: false,
            code: 400,
            message: "Gagal Register",
        });
        
    }
}