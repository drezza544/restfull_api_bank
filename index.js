const express = require('express');
const body_parser = require('body-parser');
const database = require('./config/database.config');

const app = express();
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use((req, res, next) => {
    generated_id = Math.floor((Math.random() * 99999) + 0);
    generated_apiKey = require('./commons/generated_apiKey');
    mongoose = require('mongoose');
    mongooseObjectId = new mongoose.Types.ObjectId();
    
    next();
})
app.use((req, res, next) => {
    res.set({ 'Content-Type': 'application/json' });
    next ();
});

const RegisterController = require('./Controller/RegisterController');
const LoginController = require('./Controller/LoginController');
const ActivationController = require('./Controller/ActivationController');
const BankController = require('./Controller/BankController');
const UserController = require('./Controller/UserController');
const TransferController = require('./Controller/TransferController');
const MutasiController = require('./Controller/MutasiController');

app.post('/api/v1/register', RegisterController.store);
app.post('/api/v1/login', LoginController.login);

app.get('/api/v1/user', UserController.show);
app.get('/api/v1/user/:user_id', UserController.getById);
app.put('/api/v1/user/:user_id', UserController.update);
app.delete('/api/v1/user/:user_id', UserController.delete);

app.post('/api/v1/activation', ActivationController.store);
app.get('/api/v1/activation', ActivationController.show);

app.post('/api/v1/bank', BankController.store);
app.get('/api/v1/bank', BankController.show);
app.get('/api/v1/bank/:bank_id', BankController.getById);
app.put('/api/v1/bank/:bank_id', BankController.update);
app.delete('/api/v1/bank/:bank_id', BankController.delete);

app.post('/api/v1/transfer', TransferController.store);

// app.get('/api/v1/mutasi', MutasiController.show);
// app.get('/api/v1/mutasi/:mutasi_id', MutasiController.getById);

app.listen(8000, function () {
    console.log("Server Is Running On Port: *8000");
});