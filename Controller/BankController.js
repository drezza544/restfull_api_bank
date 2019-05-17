const BankModel = require('../Model/BankModel');

exports.store = async (req, res) => {
    const { nama, transfer_nonbank_cost } = req.body;
    const generated_idBank = Math.floor((Math.random() * 999) + 0);

    if(!nama || !transfer_nonbank_cost) {
        res.status(400).json({
            status: false,
            code: 400,
            message: "Invalid Request"
        });
    }

    const createBank = await BankModel.create({
        bank_id: generated_idBank,
        nama: nama,
        transfer_nonbank_cost: transfer_nonbank_cost,
    });

    if(createBank) {
        return res.status(200).json({
            status: true,
            code: 200,
            message: "Bank Berhasil Ditambahkan",
            bank: {
                createBank
            }
        });
    }
    res.status(400).json({
        status: false,
        code: 400,
        message: "Bank Gagal Ditambahkan",
    });
}

exports.show = async(req, res) => {
    const getAllBank = await BankModel.find();
    res.status(200).json({
        status: true,
        code: 200,
        data: {
            getAllBank,
        }
    });
}

exports.getById = async(req, res) => {
    try{
        const { bank_id } = req.params;
        const getByIdBank = await BankModel.find({ bank_id: bank_id });
        res.status(200).json({
            status: true,
            code: 200,
            data: {
                getByIdBank,
            }
        });
        
    }catch(err) {
        console.log(err);
    }
}

exports.update = async(req, res) => {
    const { bank_id } = req.params;
    const { nama, transfer_nonbank_cost } = req.body;
    const checkBankId = await BankModel.find({ bank_id: bank_id });

    if(checkBankId.length > 0) {
        const updateBank = await BankModel.updateOne({ bank_id: bank_id}, { nama: nama, transfer_nonbank_cost: transfer_nonbank_cost});
        if(updateBank) {
            return res.status(200).json({
                status: true,
                code: 200,
                message: "Bank Berhasil Diubah",
                data: {
                    bank_id,
                }
            });
        }
        res.status(400).json({
            status: false,
            code: 400,
            message: "Gagal Update Bank"
        });
    }else {
        res.status(400).json({
            status: false,
            code: 400,
            message: "BANK " + bank_id +" TIDAK DAPAT DITEMUKAN"
        });
    }
}

exports.delete = async(req, res) => {
    const { bank_id } = req.params;
    const checkBankId = await BankModel.find({ bank_id: bank_id });
    if(checkBankId.length > 0) {
        const deleteBank = await BankModel.remove({ bank_id: bank_id });
        if(deleteBank) {
            return res.status(200).json({
                status: true,
                code: 200,
                message: "Bank Berhasil Dihapus"
            });
        }
        res.status(400).json({
            status: false,
            code: 400,
            message: "Bank Gagal Dihapus"
        });
    }else {
        res.status(400).json({
            status: false,
            code: 400,
            message: "BANK " + bank_id + " TIDAK DAPAT DITEMUKAN"
        });
    }
}