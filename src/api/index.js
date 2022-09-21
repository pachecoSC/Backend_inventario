const express = require('express')
const router = express.Router()

const pool = require('../conection/mysql')
const response = require('./response')

function bindRespuesta(cod, msg, data) {
  let res = {
    cod_resul: cod,
    msg: msg,
    result: data
  }

  return res
}

router.get('/', (req, res,next) => {
  // res.json('{"key":"hola"}')
  pool.query('select s.*, e.nombre_empleado, e.cargo, e.email, eq.nombre_equipo, eq.marca_equipo, eq.serie_equipo from empleados as e inner join suministros as s on e.id_empleado =s.id_empleado inner join equipos as eq on s.id_equipo = eq.id_equipo;')
    .then((data) => {
      if (data.length > 0)
      {
        obj = bindRespuesta(1, '', data)
        response.success(req,res,obj,200)
      } else {
        obj = bindRespuesta(0, 'No se encontraron datos', data)
        response.success(req,res,obj,200)
        }
    })
  .catch(next)
})

module.exports = router
