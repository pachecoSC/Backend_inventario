const mysql = require('mysql')
const { promisify } = require('util')
const config = require('../../config')

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
}

// realizar la coneccion
const pool = mysql.createPool(dbconfig)

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('coneccion perdida')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.log('base de datos ya tiene varias conecciones')
    }
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.err('coneccion rechasada')
    }
  }
  if (connection) connection.release()
  console.log('[connection established]')
  return
})
//
pool.query = promisify(pool.query)

module.exports = pool
