const express = require('express');

const app = express();

app.set('port', process.env.PORT || 80);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello AnimalPhy!');
  });


 module.exports = app;