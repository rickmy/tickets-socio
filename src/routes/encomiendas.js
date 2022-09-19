const express = require('express');
const app = express.Router();

app.get('/encomiendas/list',(req,res)=>{
  return res.json({
    code: 202,
    msj:'Hola soy encomienda'
  })
})


module.exports = app;
