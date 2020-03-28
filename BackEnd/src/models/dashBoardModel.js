
const mysql = require('../../database/mysql');
const conn = mysql.dbConnection();
const multer  = require('multer');
const depositoModel = require('../models/depositoModel');
var dashboard = require('../../database/dashBoard')();



    module.exports= {  
      prueba: (name,fileName) => {
          try{
            return new Promise((resolve,reject)=>{
              const dash = new dashboard();
              dash.imagen=fileName;
              dash.nombre=name
              dash.save().then(
                resp=>{
                  //console.log(resp);
                  let msj = {
                    status: 732,
                    statusMessage: 'Guardado de imagen correcta',
                    msj: resp.id
                }
                console.log('msj');console.log(msj);
                  resolve(msj);
                }
              )
             });          
          }catch(err){
            console.log("error");
          }
        },
        upploadInfo: (info)=>{
          return new Promise((resolve,reject)=>{
            console.log('info');
            const line ='UPDATE dashboard SET create_at=\''+info['create_at']+'\' ,id_deposito='+info['id_deposito']+' WHERE id='+info['id'];
            conn.query(line,(err,result)=>{
              if(err){
                let msj = {
                    status: 735,
                    msj: 'Error de datos imagen correcta'
                }
                resolve(msj);
              };
              console.log('updatesstate');
              depositoModel.updateStateDeposit(info['id_deposito'],'COMPLETADA').then(
                resUpdateDeposit=>{
                  if(resUpdateDeposit==1){
                    let msj = {
                      status: 734,
                      msj: 'Guardado de datos imagen correcta'
                    }
                    resolve(msj);
                  }else{
                    let msj = {
                      status: 736,
                      msj: 'Error al actualizar el estado del deposito'
                  }
                  resolve(msj);
                  }              
                }
              )
            });
           });


      },
        getDashboard:(id_deposito)=>{

          return new Promise((resolve,reject)=>{
            dashboard.findOne({ where:{ id_deposito:id_deposito}}).then(
              resp=>{
                console.log(resp);
                const response ={
                  status: 737,
                  msj: 'Dasboard encontrado con exito',
                  dashboard:resp.imagen
                }
                resolve(resp.imagen);
              }
            )
          })
        }
      }