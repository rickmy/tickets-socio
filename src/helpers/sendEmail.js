const nodemailer = require('nodemailer');
const { keyEmail } = require('../keysEmail');

module.exports = function (user) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { ...keyEmail },
  });

  var mailOptions = {
    from: keyEmail.user,
    to: `${user.email}`,
    subject: 'Actualizar password - ECUAREFILLS',
    html: `
    <div style="background: #cfedf9; padding: 50px; text-align: center;">
      <div style="background-color: white; max-width: 300px; box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5); border-radius:15px; padding:50px; height: 300px;">
        <img style="float : left" src="https://i.ibb.co/JdMVcyS/logo.png" width="100" alt="icono" border="0">
          <h2 style="color: #012E40; margin-top:90px;">Actualizar password</h2>
          <h3 style="color: #012E40; margin-bottom: 25px ;">Si deseas actualizar tu contraseña ve hacia el enlace, de lo contrario, ignoralo</h3>
          <a href="http://localhost:3000/signin/restore/${user.cedula}" style="margin-top:50px; background-color:#012E40; padding:10px 15px; color:white; border-radius:15px">Actualizar</a>
      </div>
    </div>
  `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
