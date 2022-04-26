const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isNotLoggedIn } = require('../lib/auth');
const sendEmail = require('../helpers/sendEmail');
const { getUserByEmail } = require('../helpers/getUserByEmail');
const { updatePassword } = require('../helpers/updatePassword');
const { crearRegistro } = require('../helpers/loginQuery');

const {
  nameValidate,
  cedulaValidate,
  direccionValidate,
  telefonoValidate,
  emailValidate,
  passwordValidate,
} = require('../helpers/validationForm');

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/signin', (req, res) => {
  res.render('auth/signin');
});

router.get('/logout', (req, res) => {
  crearRegistro(req.user.id_cedula, 'Logout');
  req.logOut(); //esto es lo que hace que se cierra la sesion del usuario.
  res.redirect('/signin');
});

router.get('/signin/forgot', (req, res) => {
  res.render('auth/forgot');
});

router.get('/signin/restore/:id', (req, res) => {
  const { id } = req.params;

  res.render('auth/restore');
});

router.post('/signin/restore/:id', isNotLoggedIn, (req, res) => {
  const { id } = req.params;
  const { password, password_conf } = req.body;

  const passValidate = passwordValidate(req, password, password_conf);

  if (passValidate) {
    updatePassword(req, id, password, password_conf);
    req.flash('password', 'El password se ha actualizado correctamente');
  }

  res.redirect(`/signin/restore/${id}`);
});

router.post('/signin/forgot', isNotLoggedIn, async (req, res) => {
  const { email } = req.body;

  const user = await getUserByEmail(email);

  if (email != '') {
    if (user.length > 0) {
      const userId = user[0].id_cedula;
      await sendEmail({ email, cedula: userId });
      req.flash('message', `Hemos enviado un correo a ${user[0].email}`);
    } else {
      req.flash('message', `No hemos encontrado un usuario con ${email}`);
    }
  } else {
    req.flash('message', `Llena los campos.`);
  }

  /* BUSCAR POR EMAIL EN DB */

  res.redirect('/signin/forgot');
});

router.post('/signin', (req, res, next) => {
  const { cedula, password } = req.body;

  if (cedula == '' || password == '') {
    req.flash('message', 'Llena todos los campos');
    res.redirect('/signin');
    return;
  }

  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true,
  })(req, res, next);
});

router.post('/signup', (req, res, next) => {
  const { nombres, username, direccion, telefono, email, password, password_conf } = req.body;

  const userFlash = {
    nombres,
    username,
    direccion,
    telefono,
    email,
    password,
    password_conf,
  };

  const nombresOk = nameValidate(req, nombres);
  const cedulaOk = cedulaValidate(req, username);
  const direccionOk = direccionValidate(req, direccion);
  const telefonoOk = telefonoValidate(req, telefono);
  const emailOk = emailValidate(req, email);
  const passwordOk = passwordValidate(req, password, password_conf);

  if (!nombresOk || !cedulaOk || !direccionOk || !telefonoOk || !emailOk || !passwordOk) {
    req.flash('valuesForm', userFlash);
    res.redirect('/signup');
  }

  passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true,
  })(req, res, next);
});

module.exports = router;
