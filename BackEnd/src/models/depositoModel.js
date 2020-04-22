
const mysql = require('../../database/mysql');
var depositos = require('../../database/deposito')();
var Sequelize = require('sequelize');
var deposito = require('./usuarioModel');
const conn = mysql.dbConnection();
    module.exports= {
      
      allDepositsForUser: (id) => {
        console.log('allDepositsForUser id');
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
              console.log('getDepositos');
              depositos.findAll({ order: [
                ['create_at', 'DESC']
            ]})
                .then(
                  res=>{

                    resolve(res);
                  }
                )
            })
          },
          getDepositosOnlyVerif: () => {
            return new Promise((resolve, reject) => {
              console.log('esteeeee')
              depositos.findAll({     where: {  status      : "EN VERIFICACION"             }    },
              { order: [
                ['fecha', 'DESC']
            ]})
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
          console.log('getDepositosForId');
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
            var depo = new depositos();
          depo.monto_transaccion=req.body.monto_transaccion;
          depo.monto=req.body.monto;
          depo.pais=req.body.pais;
          depo.status=req.body.status;
          depo.id_user=req.body.id_user;
          depo.fecha=req.body.fecha;
          depo.tasa=req.body.tasa;
          depo.createAt=req.body.create_at;
          depo.id_destinatario=req.body.id_destinatario;
           depo.save().then(
             resp=>{ 
              console.log(req.body)
            deposito.updateSaldo(req.body.saldo_restante,req.body.viejo_saldo, depo.id_user).then(
              ress=>{
                console.log(ress);
                if(ress.status==737){
                  depositos.destroy({where:{id:resp.dataValues.id}}).then(
                    resDelete=>{
                      console.log(resDelete);
                       if(resDelete==1){
                        resolve(ress);
                       }else{
                        depositos.update({status:'ERROR'},{where:{id:resp.dataValues.id}}).then(
                          resError=>{
                            resolve(ress);//aqui generar un codigo para reportar error de eliminado de transaccion
                          }
                        )              
                       }
                    }
                  )
                }
                resolve(ress);
             
              })
            
          })
          .catch((err) => {
            console.log('There was an error querying contacts', JSON.stringify(err))
            resolve({status:739,title:'Error',text:'Hubo un error al insetar el deposito'});
          });
        })
      }
      }
