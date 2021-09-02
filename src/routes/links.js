const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const { updateUser } = require('../helpers/loginQuery');
const pool = require('../database');

router.get('/list', isLoggedIn, (req, res) => {
  res.render('links/list');
});

router.get('/add', isLoggedIn, async (req, res) => {
  res.render('links/add');
});

router.get('/registros', isLoggedIn, async (req, res) => {
  const text = 'select * from registros';
  const data = await pool.query(text);
  const registros = data.rows;
  res.render('links/registros', { registros });
});

router.post('/add', async (req, res) => {
  res.redirect('/links');
});

router.get('/profile/edit', isLoggedIn, async (req, res) => {
  const user = req.user;
  res.render('links/edit', { user });
});

router.post('/profile/edit', async (req, res) => {
  const userInfo = req.user;

  const newInfo = req.body;

  if (userInfo.fk_rol != 5) {
    await updateUser('users_colaborador', newInfo, userInfo.id_cedula);
  } else {
    await updateUser('users_cliente', newInfo, userInfo.id_cedula);
  }

  res.redirect('/profile');
});

module.exports = router;
