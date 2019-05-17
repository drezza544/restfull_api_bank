const UserModel = require('../Model/UserModel');

exports.login = (req, res) => {
    const { email, pin } = req.body;

    UserModel.findOne(
        { email: email},
        { pin: pin},
    ).then(data => {
        if(!data) {
            return res.status(400).json({
                status: false,
                code: 400,
                message: "User Tidak Dapat Ditemukan" 
            });
        }
        res.status(200).json({
            status: true,
            code: 200,
            message: "Berhasil Login"
        })
    }).catch(err => {
        console.log(err);
    })

}