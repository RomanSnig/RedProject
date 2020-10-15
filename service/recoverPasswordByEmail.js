const mailer = require('nodemailer');
const {PASSWORD, EMAIL} = require('../constants/email');

module.exports.recoverPassword = async (email, hashedPassword) => {
    const transport = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    });
    const info = await transport.sendMail({
        from: EMAIL,
        to: email,
        subject: 'Test message',
        text: 'New Password: ' + hashedPassword,
        html: '<b>ok</b>'
    });
    return info.response;
};
