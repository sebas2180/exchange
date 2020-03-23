
const mysql = require('../../database/mysql');
const conn = mysql.dbConnection();
const Tasa = require('../../database/tasas')();
const Tasa_historial = require('../../database/Tasa_historial')();

module.exports = {
  getTasas : function() { 
        
    return new Promise((resolve,reject)=>{
        Tasa.findAll()
            .then(
                res=>{
                  const resp ={
                    status:729,
                    msj:res
                  }
                    resolve(resp);
                }
            )
    })
}, getTasa: (pais)=>{
        const linea = 'SELECT * FROM tasas WHERE pais=\''+pais+'\'';
        console.log(linea);
        return new Promise((resolve, reject) => {
          conn.query(linea, function(err, results) {
            if (err) {
              throw err;
            }
           
            resolve((results));
          });
        })
}, updateTasa: (req)=>{
  console.log(req.body);
  return new Promise((resolve,reject)=>{
    Tasa.update(
      {tasa_actual : req.body.tasa_actual,
          createdAt : req.body.create_at  },
      {     where:{ pais:req.body.nombre},
      }
      )
        .then(
            res=>{
              Tasa.findOne({ where:{ pais: req.body.nombre}})
              .then(
                res1=>{
                  
                  const aux= res1.dataValues;
                  console.log(aux.id);
                  const tasa_h = new Tasa_historial();
                  tasa_h.cotizacion = req.body.tasa_actual;
                  tasa_h.createdAt = req.body.create_at ;
                  tasa_h.id_pais = aux.id;
                  tasa_h.save();
                  const resp ={
                    status:730,
                    msj:'correcta actualizacion de tasas'
                  }
                    resolve(resp);
                },
                err=>{
                  const resp ={
                    status:731,
                    msj:'error al actualizar las tasas'
                  }
                    resolve(resp);
                }
              )
            },
            err=>{
              const resp ={
                status:731,
                msj:'error al actualizar las tasas'
              }
                resolve(resp);
            }
        )
})
    }
}