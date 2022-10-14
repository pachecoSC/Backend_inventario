const config = require('dotenv')

//declara si estamos en PRD o DEV
const NODE_ENV  ='development'
// const NODE_ENV  ='production'

config.config({path:`.env.${NODE_ENV}`})

module.exports= {
  port: process.env.PORT || '',
  host: process.env.MYSQL_HOST || '',
  user: process.env.MYSQL_USER || '',
  password: process.env.MYSQL_PASS || '',
  database: process.env.MYSQL_DB || ''
}
