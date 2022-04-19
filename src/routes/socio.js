const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const { updateUser } = require('../helpers/loginQuery');
const pool = require('../database');

const datos = [
  {
    fecha: '22-04-25',
    hora_salida: '09:00',
    hora_llegada: '09:00',
    ruta: 'Quito-Loja',
    asientos: '10',
    encomiendas: '10',
  },
  {
    fecha: '22-04-25',
    hora_salida: '09:00',
    hora_llegada: '09:00',
    ruta: 'Quito-Guayas',
    asientos: '10',
    encomiendas: '10',
  },
  {
    fecha: '22-04-25',
    hora_salida: '09:00',
    hora_llegada: '09:00',
    ruta: 'Quito-Cuenca',
    asientos: '10',
    encomiendas: '10',
  },
  {
    fecha: '22-04-25',
    hora_salida: '09:00',
    hora_llegada: '09:00',
    ruta: 'Quito-Guayas',
    asientos: '10',
    encomiendas: '10',
  },
  {
    fecha: '22-04-25',
    hora_salida: '09:00',
    hora_llegada: '09:00',
    ruta: 'Quito-Guayas',
    asientos: '10',
    encomiendas: '10',
  },
];

router.get('/bus', (req, res) => {
  res.render('socio/bus');
});

router.get('/detalle', (req, res) => {
  res.render('socio/detalle', { datos });
});

router.get('/bus-coop', (req, res) => {
  res.render('socio/bus-coop');
});

module.exports = router;
