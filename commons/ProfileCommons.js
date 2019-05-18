const UserModel = require('../Model/UserModel');

exports.updateSaldo = (user_id, saldo) => {
	return new Promise((resolve, reject) => {
		UserModel.findOneAndUpdate (
            { user_id: user_id }, 
            {
                profile: 
                {
                saldo: saldo 
                }
            }
        )
		.then(rows => {
			resolve(rows);
		})
		.catch(err => {
			reject(err);
		});
	});
}