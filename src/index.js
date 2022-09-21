const express = require('express')
const path = require('path')
const cors = require('cors')

// Intializations
const app = express();

// habilitar los cors
app.use(cors())

// Settings
app.set('port', process.env.PORT || 4000);

// Routes
app.use(require('./api/index'));
app.use('/gestor',require('./api/index'))

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting
app.listen(app.get('port'), () => {
  console.log('Server is in port', app.get('port'));
});
