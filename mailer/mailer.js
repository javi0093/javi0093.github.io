const nodemailer = require('nodemailer');

const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'krystal83@ethereal.email',
        pass: 'uNRDzhfhdvh3N5Sjc3'
    }
};

module.exports = nodemailer.createTransport(mailConfig);