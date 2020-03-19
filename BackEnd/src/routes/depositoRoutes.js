const mysql = require('mysql2');
const depositoModel = require('../models/depositoModel');

function depositosRoutes(app,passport) {
    
    app.post('/addDeposito',(req,res)=>{
        depositoModel.addDeposito(req)
        .then(
            resp=>{
                console.log(resp);
                res.send(resp);
            }
        );
        
    });
    app.get('/EstadisticasDelUsuario',(req,res)=>{
        resp = depositoModel.getEstadisticasDelUsuario(req.query.id_user)
     .then(resp =>{
        console.log(resp);
        if(resp != undefined){
        res.send(JSON.stringify(resp));
        }
     });
        if(resp == undefined){
            const response = {
                status: 600,
                msj: "No se ha encontrado usuario"
            }
            res.send(response);   
        } 
    });

    app.get('/allDepositsForUser',(req,res)=>{ 
     resp = depositoModel.getDepositos(req.query.id)
     .then(resp =>{
        console.log(resp);
        if(resp != undefined){
        res.send(JSON.stringify(resp));
        }
     });
        if(resp == undefined){
            const response = {
                status: 600,
                msj: "No se ha encontrado depositos"
            }
            res.send(response);   
        }
        
    });

    app.get('/allDepositsForDestinatario',(req,res)=>{ 
        resp = depositoModel.getDepositosForDestinatario(req.query)
        .then(resp =>{
           console.log(resp);
           if(resp != undefined){
           res.send(JSON.stringify(resp));
           }
        });
           if(resp == undefined){
               const response = {
                   status: 600,
                   msj: "No se ha encontrado depositos"
               }
               res.send(response);   
           }
           
       });
   
    
}

module.exports= depositosRoutes;