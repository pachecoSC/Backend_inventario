const express = require('express')
var QRCode = require('qrcode')
var bodyParser = require('body-parser')
const router = express.Router()

const pool = require('../conection/mysql')
const response = require('./response')

var app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

function bindRespuesta(cod, msg, data) {
  let res = {
    cod_result: cod,
    msg: msg,
    result: data
  }

  return res
}
// rutas con funciones
router.get('/', list)
router.post('/add', jsonParser, insert)
router.post('/get_qr', jsonParser, generateQR)

function list(req, res, next) {
  // res.json('{"key":"hola"}')
  pool
    .query(
      'select s.*, e.nombre_empleado, e.cargo, e.email, eq.nombre_equipo, eq.marca_equipo, eq.serie_equipo from empleados as e inner join suministros as s on e.id_empleado =s.id_empleado inner join equipos as eq on s.id_equipo = eq.id_equipo;'
    )
    .then((data) => {
      if (data.length > 0) {
        obj = bindRespuesta(1, '', data)
        response.success(req, res, obj, 200)
      } else {
        obj = bindRespuesta(0, 'No se encontraron datos', data)
        response.success(req, res, obj, 404)
      }
    })
    .catch(next)
}

function insert(req, res, next) {
  // console.log(req.body)
  // req.body.
  let date_time = new Date().toLocaleDateString() //obtner fecha
  const param = {
    codigo_inventario: req.body.codigo_inventario,
    estado: req.body.estado,
    fecha_compra: date_time,
    fecha_translado: date_time,
    fecha_baja: date_time,
    fecha_inventario: date_time,
    proveedor: req.body.proveedor,
    id_empleado: req.body.id_empleado,
    id_equipo: req.body.id_equipo
  }
  // let mensa = 'INSERT INTO suministros ?'+param;

  // console.log(mensa)
  pool
    .query('INSERT INTO suministros set ?', param)
    .then((data) => {
      obj =
        data.affectedRows > 0
          ? bindRespuesta(1, 'Registro exitoso', undefined)
          : bindRespuesta(0, 'Registro fallido', undefined)
      // obj = bindRespuesta(1, 'registro exitoso', data)
      response.success(req, res, obj, 201)
    })
    .catch(next)
}

function generateQR(req, res, next) {
  // QRCode.toDataURL(req.body.codigo_inventario, function (err, url) {
  //   console.log(url)
  // })
  console.log(req.body)
  QRCode.toDataURL(req.body.codigo_inventario)
    .then((url) => {
      // console.log(url)
      obj = bindRespuesta(1, '', url)
      response.success(req, res, obj, 200)
    })
    .catch((err) => {
      // console.error(err)
      obj = bindRespuesta(0, 'No se completo la acción', data)
      response.success(req, res, obj, 400)
      next
    })
}

module.exports = router
