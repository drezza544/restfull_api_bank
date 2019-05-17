const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/project_bank';

mongoose.connect(url, {
    useNewUrlParser: true 
}).then(() => {
    console.log("Database Connected");
}).catch(() => {
    console.log("Database Not Connected");
});