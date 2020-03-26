
const mysql = require('../../database/mysql');
var depositos = require('../../database/deposito')();
var Sequelize = require('sequelize');
const conn = mysql.dbConnection();
    module.exports= {
      
      getDepositos: (id) => {
        //console.log('id_user' +(id));
          //const linea = 'SELECT * FROM depositos d WHERE d.id_user='+id+' order by d.fecha DESC';
         // console.log(linea);
          return new Promise((resolve, reject) => {
            depositos.findAll({     where: {  id_user      : id             }    },
              { order: { fecha: 'DESC'  }})
            .then(
              res=>{
            //    console.log(res);
                
                resolve(res);
              }
            )
          })
        },
        getDepositos: () => {
            return new Promise((resolve, reject) => {
              depositos.findAll()
                .then(
                  res=>{
                   // console.log(res);
                    
                    resolve(res);
                  }
                )
            })
          },
          getDepositosOnlyVerif: () => {
            return new Promise((resolve, reject) => {
              depositos.findAll({     where: {  status      : "EN VERIFICACION"             }    })
                .then(
                  res=>{
                    resolve(res);
                  }
                )
            })
          },
        
      
      getEstadisticasDelUsuario: (id) => {

          return new Promise((resolve, reject) => {
            depositos.count({     where: {  id_user      : id             }    })
            .then(
              res=>{
                console.log(res);  
                const ultimoMes = new Date();
                ultimoMes.setMonth(ultimoMes.getMonth()-1);
                   var options = {
                        year: "numeric",
                        month: "2-digit",
                        day: "numeric"
                };
                const a =  ultimoMes.toLocaleDateString("fr-CA",options);
                const Op = Sequelize.Op;
                depositos.count({ where: { 
                                       fecha:
                                            {  [Op.gt]: a }
                                        } 
                })
                .then(
                  res1=>{
                     
                    resolve({ total: res,ultimo_mes: res1});
                  }
                )
              }
            )
          })
        }   ,
        getDepositosForDestinatario:(beneficiario) => {
          return new Promise((resolve,reject)=>{
            depositos.findAll({     where: {  id_user      : beneficiario.id_destinatario ,
                                              id_destinatario : beneficiario.id_user    }   
                              })
            .then(
              res=>{
              console.log(res);
                resolve(res);
              }
            )
          });
        },
        getDepositosForId:(deposito) => {
          return new Promise((resolve,reject)=>{
            depositos.findAll({     where: {  id      : deposito.id    }   
                              })
            .then(
              res=>{
         
                resolve(res);
              }
            )
          });
        },
        updateStateDeposit:(id_deposito,state) => {
          return new Promise((resolve,reject)=>{
            depositos.update({  status : state         },
                              {     where: {  id      : id_deposito   }   
                              })
            .then(
              res=>{
              console.log(res);
                resolve(res);
              }
            )
          });
        },
        addDeposito:(req) =>{
          return new Promise((resolve,reject)=>{

            const linea =  `INSERT INTO depositos set? `;
         //   console.log(linea);
            conn.query(linea,[req.body],(err,result)=>{
              
              resolve({status:721,id_deposito:result.insertId});
            });
          });
        }
      }
