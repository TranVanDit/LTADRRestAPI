const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',//E.g, Gmail, 'Outlook', etc
    auth:{
        user: 'tranvandit10102002@gmail.com',
        pass: 'icnf ivod byyj ewzq'
    }
});
module.exports = transporter