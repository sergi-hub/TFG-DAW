const nodemailer = require('nodemailer');


const sendEmail = (req, res) => {
    const transporter = req.app.get('transporter');

    console.log(req.body);

    const { to, body } = req.body;

    const mailOptions = {
        from: 'sergi26072002@outlook.es',
        to: to,
        subject: 'Recuperación de contraseña usuario',
        text: 'Esta es tu contraseña: ' + body,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.error('Error al enviar el correo electrónico: ', error);
            res.status(500).json({ message: 'Error al enviar el correo electrónico' });
        } else {
            console.log('Correo electrónico enviado: ', info.response);
            res.status(200).json({ message: 'Correo electrónico enviado correctamente' });
        }
    });
}

module.exports = { sendEmail };