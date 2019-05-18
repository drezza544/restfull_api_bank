const TransferModel = require('../Model/TransferModel');
const UserModel = require('../Model/UserModel');
const BankModel = require('../Model/BankModel');
const ActivationModel = require('../Model/ActivationModel');
const ProfileCommons = require('../commons/ProfileCommons');

exports.store = async (req, res) => {
    const { user_id, bank_id, rekening_tujuan, nominal, password_transaksi } = req.body;
    const generated_id = Math.floor((Math.random() * 99999999) + 0);
    const date = new Date();
    const checkUserId = await UserModel.find({ user_id: user_id });
    const checkActivationCard = await ActivationModel.find({ user_id: user_id });
    const checkActivationReceived = await ActivationModel.find({ nomor_kartu: rekening_tujuan });
    const checkBank = await BankModel.find({ bank_id: bank_id });
    const checkPasswordTransaksi = await UserModel.find(
        { user_id: user_id },
        { password_transaksi: password_transaksi }
    );

    if(checkUserId.length == 0) {
        return res.status(400).json({
            status: false,
            code: 400,
            message: "Unauthorized"
        });
    }else if(nominal < 1000) {
        res.status(200).json({
            status: true,
            code: 200,
            message: "Minimal Transfer RM 1000"
        });
    }else if(checkBank.length == 0) {
        res.status(400).json({
            status: false,
            code: 400,
            message: "Bank Tidak Dapat Ditemukan"
        });
    }else if(checkActivationCard.length == 0) {
        res.status(400).json({
            status: false,
            code: 400,
            message: "Belum Activation Kartu Debit"
        });
    }else if(checkActivationCard[0].nomor_kartu == rekening_tujuan) {
        res.status(400).json({
            status: false,
            code: 400,
            message: "Tidak Bisa Transfer Ke Nomor Rekening Anda"
        });
    }else if(checkActivationReceived.length == 0) {
        res.status(400).json({
            status: false,
            code: 400,
            message: "No Rekening Tidak Di Temukan"
        });
    }else if(!checkPasswordTransaksi[0]) {
        res.status(400).json({
            status: false,
            code: 400,
            message: "Password Transaksi Anda Salah"
        });
    }else if(checkActivationReceived.length > 0) {
        const dataSender = await UserModel.find({ user_id: user_id });
        const dataReceived = await UserModel.find({ user_id: checkActivationReceived[0].user_id });
        const dataSenderBank = await ActivationModel.find({ user_id: user_id });
        const dataReceivedBank = await ActivationModel.find({ user_id: checkActivationReceived[0].user_id });

        if(!dataSender || !dataReceived || !dataSenderBank || !dataReceivedBank) {
            return res.status(400).json({
                status: false,
                code: 400,
                message: "Internal Server Error"
            });
        }
        let senderSaldo = dataSender[0].profile[0].saldo;
        let senderBankId = dataSenderBank[0].bank_id;
        // console.log(senderSaldo);
        let receivedSaldo = dataReceived[0].profile[0].saldo;
        let receivedBankId = dataReceivedBank[0].bank_id;
        // console.log(receivedBankId);
        if(senderSaldo < nominal) {
            return res.status(400).json({
                status: false,
                code: 400,
                message: "Saldo Anda Tidak Mencukupi Untuk Transfer Saat Ini"
            });
        }
        if(senderBankId !== receivedBankId) {
            senderSaldo -= parseInt(nominal) + parseInt(checkBank[0].transfer_nonbank_cost);
        }else {
            senderSaldo -= parseInt(nominal);
        }

            receivedSaldo += parseInt(nominal);
            const updateSaldoSender = await ProfileCommons.updateSaldo(user_id, senderSaldo);
            const updateSaldoReceived = await ProfileCommons.updateSaldo(dataReceivedBank[0].user_id, receivedSaldo);
            if(!updateSaldoSender || !updateSaldoReceived) {
                return res.status(400).json({
                    status: false,
                    code: 400,
                    message: "Gagal Untuk Melakukan Transfer"
                });
            }
            await TransferModel.create({
                _id: mongooseObjectId,
                transfer_id: generated_id,
                user_id: user_id,
                bank_id: bank_id,
                rekening_tujuan: rekening_tujuan,
                nominal: nominal,
                password_transaksi: password_transaksi,
            })
            res.status(200).json({
                status: true,
                code: 200,
                message: "Berhasil Transfer",
                data: { 
                    rekening_tujuan: rekening_tujuan,
                    nominal: nominal,
                    cost_saldo: senderSaldo,
                }
            });
        
    }
}
