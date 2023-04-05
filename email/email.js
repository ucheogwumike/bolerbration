const mail = require('nodemailer');

let transporter = mail.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure:true,
    auth:{
        user:'agroease50@gmail.com',
        pass:'hobrsseoweolfgkp'
    }
});

module.exports= transporter;