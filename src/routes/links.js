const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

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

router.get('/delete/:id', isLoggedIn, async (req, res) => {
  // req.params.id   ==> aqui es donde se guardan los paramtro de las url
  const { id } = req.params;
  await pool.query('DELETE FROM links WHERE id = ?', [id]);
  req.flash('success', 'Link eliminado correctamente');
  res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const links = await pool.query('SELECT *  FROM links WHERE id = ?', [id]);
  console.log(links[0]);
  res.render('links/edit', { link: links[0] });
});

router.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, url } = req.body;
  const newLink = {
    title,
    description,
    url,
  };

  await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
  req.flash('success', 'Link acutualizado correctamente');
  res.redirect('/links');
});

router.get('/', isLoggedIn, async (req, res) => {
  //Aqui estamos en la ruta /links
  /* 
    TODO: Aqui lo que tienes que hacer es traer de la tabla cliente_plan y mostrar sus registros, para eso le pasas a la vista la informacion, luego de una coma
*/
  res.render('links/list');
});

module.exports = router;
