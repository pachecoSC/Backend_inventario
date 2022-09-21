module.exports = {
  remoteDB: process.env,
  api: {
    port: process.env.PORT || 30000
  },
  mysql: {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port:process.env.MYSQL_PORT || '3306',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASS || '',
    database: process.env.MYSQL_DB || 'gestion_inventario'
  },
}
