const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const { updateUser } = require('../helpers/loginQuery');
const pool = require('../database');

router.get('/bus', (req, res) => {
  res.render('socio/bus');
});

router.get('/detalle', (req, res) => {
  res.render('socio/detalle');
});

module.exports = router;
