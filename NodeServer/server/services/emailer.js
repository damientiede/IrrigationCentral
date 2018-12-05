const nodemailer = require('nodemailer');

module.exports = {
    send(mailOptions) {
        let transporter = nodemailer.createTransport({
            host: '',
            port: 567,
            // service: 'gmail',
            auth: {
              user: 'youremail@gmail.com',
              pass: 'yourpassword'
            }
        });

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));            
        });       
    }
}