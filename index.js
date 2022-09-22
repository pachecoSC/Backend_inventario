const express = require('express')
const path = require('path')
const cors = require('cors')
//necesario para la documentacion
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./src/openapi.json')

// Intializations
const app = express()

// habilitar los cors
app.use(cors())

// Settings
app.set('port', process.env.PORT || 4000)

// Routes
app.use(require('./src/api/index'))
app.use('/api-gestor', require('./src/api/index'))
// documentacion
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

// Public
app.use(express.static(path.join(__dirname, 'public')))

// Starting
app.listen(app.get('port'), () => {
  console.log('Server is in port', app.get('port'))
})
