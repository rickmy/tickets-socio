const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

const { getUser, updateUser } = require('../helpers/loginQuery');

router.get('/add', isLoggedIn, (req, res) => {
  res.render('links/add');
});

router.post('/add', async (req, res) => {
  const { title, url, description } = req.body;
  let newLink = {
    title,
    url,
    description,
    user_id: req.user.id,
  };

  await pool.query('INSERT INTO links set ?', [newLink]); //el "?" es para decirle en que aprte ingresera un dato
  req.flash('success', 'Link guardado correctamente');
  res.redirect('/links');
});

router.get('profile/delete/:id', isLoggedIn, async (req, res) => {
  // const { id } = req.params;
  // await pool.query('DELETE FROM links WHERE id = ?', [id]);
  // req.flash('success', 'Link eliminado correctamente');
  // res.redirect('/links');
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

  // await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
  // req.flash('success', 'Link acutualizado correctamente');
  // res.redirect('/links');
});

router.get('/links/add', isLoggedIn, async (req, res) => {
  //Aqui estamos en la ruta /links
  /* 
    TODO: Aqui lo que tienes que hacer es traer de la tabla cliente_plan y mostrar sus registros, para eso le pasas a la vista la informacion, luego de una coma
*/
  res.render('links/add');
});

module.exports = router;
