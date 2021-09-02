const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getRol } = require('../helpers/getRol');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const sendEmail = require('../helpers/sendEmail');
const { getUserByEmail } = require('../helpers/getUserByEmail');
const { updatePassword } = require('../helpers/updatePassword');
const { crearRegistro } = require('../helpers/loginQuery');
const { getAllUsers, getAllUsersInactive } = require('../helpers/getAllUsers');
const { deleteUser } = require('../helpers/deleteUser');
const {
  nameValidate,
  cedulaValidate,
  direccionValidate,
  telefonoValidate,
  emailValidate,
  passwordValidate,
} = require('../helpers/validationForm');

router.get('/signup', isNotLoggedIn, (req, res) => {
  res.render('auth/signup');
});

router.get('/signup-cola', isNotLoggedIn, (req, res) => {
  res.render('auth/signup-cool');
});

router.get('/signin', isNotLoggedIn, (req, res) => {
  res.render('auth/signin');
});

router.get('/logout', (req, res) => {
  crearRegistro(req.user.id_cedula, 'Logout');
  req.logOut(); //esto es lo que hace que se cierra la sesion del usuario.
  res.redirect('/signin');
});

router.get('/profile', isLoggedIn, async (req, res) => {
  const userInfo = req.user;
  let userRol = '';

  if (userInfo.fk_rol != 5) {
    userRol = await getRol('users_colaborador', userInfo.id_cedula);
  } else {
    userRol = await getRol('users_cliente', userInfo.id_cedula);
  }

  res.render('profile', { userInfo, userRol });
});

router.get('/signin/forgot', isNotLoggedIn, (req, res) => {
  res.render('auth/forgot');
});

router.get('/signin/restore/:id', isNotLoggedIn, (req, res) => {
  const { id } = req.params;

  res.render('auth/restore');
});

router.get('/admin', isLoggedIn, async (req, res) => {
  const users = await getAllUsers();
  const usersInactive = await getAllUsersInactive();

  res.render('links/admin', { users, usersInactive });
});

router.get('/admin/delete/:id/:rol', async (req, res) => {
  const { id: cedula, rol } = req.params;

  let table = '';

  if (rol != 5) {
    table = 'users_colaborador';
  } else {
    table = 'users_cliente';
  }

  deleteUser(table, cedula, false);

  req.flash('message', 'Usuario desactivado');
  res.redirect('/admin');
});

router.get('/admin/activate/:id/:rol', async (req, res) => {
  const { id: cedula, rol } = req.params;

  let table = '';

  if (rol != 5) {
    table = 'users_colaborador';
  } else {
    table = 'users_cliente';
  }

  deleteUser(table, cedula, true);

  req.flash('message', 'Usuario activado');
  res.redirect('/admin');
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

router.post('/signup-cola', (req, res, next) => {
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
    res.redirect('/signup-cola');
  }

  passport.authenticate('local.signup.cola', {
    successRedirect: '/profile',
    failureRedirect: '/signup-cola',
    failureFlash: true,
  })(req, res, next);
});

module.exports = router;
