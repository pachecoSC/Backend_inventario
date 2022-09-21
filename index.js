const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola mi servidor')
})
app.get('/ruta', (req, res) => {
  res.send('Hola mi primera ruta')
})
app.get('/products', (req, res) => {
  res.json({
    name: "producto 1",
    price: 1000
  });
})

app.listen(port, () => {
  console.log('Mi port'+ port)
})
