const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/project_bank';

mongoose.set('useFindAndModify', false);
mongoose.connect(url, {
    useNewUrlParser: true 
}).then(() => {
    console.log("Database Connected");
}).catch(() => {
    console.log("Database Not Connected");
});