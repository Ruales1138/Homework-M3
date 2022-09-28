const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.post('/sum', (req, res) => {
  let {a, b} = req.body;
  res.send({
    result: a + b,
  });
});

app.post('/product', (req, res) => {
  res.send({ 
    result: req.body.a * req.body.b,
  });
});

app.post('/sumArray', (req, res) => {
  let {array, num} = req.body;
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if(array[i] + array[j] === num) return res.json({result: true})
    }
  } 
  return res.json({
    result: false
  })
});

app.post('/numString', (req, res) => {
  let {string} = req.body;
  if(typeof string !== 'string' || !string.length) return res.sendStatus(400)
  else {
    return res.send({
      result: string.length,
    })
  }
});

app.post('/pluck', (req, res) => {
  let {array, prop} = req.body;
  if(!Array.isArray(array) || !prop.length) return res.sendStatus(400)
  else {
    let result = array.map(e => e[prop])
    return res.send({result: result})
  } 
})

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
