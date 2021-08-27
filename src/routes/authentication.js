const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getRol } = require('../helpers/getRol');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

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

router.post('/signin', (req, res, next) => {
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true,
  })(req, res, next);
});

router.post(
  '/signup-cola',
  passport.authenticate('local.signup.cola', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true,
  })
);

router.post(
  '/signup',
  passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true,
  })
);

module.exports = router;
