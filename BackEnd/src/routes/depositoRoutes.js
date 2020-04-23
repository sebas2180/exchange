const mysql = require('mysql2');
const depositoModel = require('../models/depositoModel');

function depositosRoutes(app,passport) {
    
    app.post('/addDeposito',verifyToken.verificar,(req,res)=>{
        depositoModel.addDeposito(req)
        .then(
            resp=>{
               // console.log(resp);
                res.send(resp);
            }
        );
        
    });
 
    app.get('/EstadisticasDelUsuario',verifyToken.verificar,(req,res)=>{
        resp = depositoModel.getEstadisticasDelUsuario(req.query.id_user)
     .then(resp =>{
         console.log(resp);
        if(resp){
            
            const response = {
                status: 600,
                msj: resp
            }
        res.send(JSON.stringify(response));
        }else{
            const response = {
                status: 600,
                msj: "No se ha encontrado usuario"
            }
            res.send(response);   
        }
     });
      
    });

    app.get('/allDepositsForUser',verifyToken.verificar,(req,res)=>{ 
        console.log(req.query);
    depositoModel.allDepositsForUser(req.query.id)
     .then(resp =>{
        
        if(resp){
        res.send(JSON.stringify(resp));
        }
        if(!resp){
            const response = {
                status: 600,
                msj: "No se ha encontrado depositos"
            }
            res.send(response);   
        }
     });
    });

    app.get('/allDepositsForDestinatario',verifyToken.verificar,(req,res)=>{ 
        resp = depositoModel.getDepositosForDestinatario(req.query)
        .then(resp =>{  
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
       app.get('/getDepositosForId',verifyToken.verificar,(req,res)=>{ 
        resp = depositoModel.getDepositosForId(req.query)
        .then(resp =>{  
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
    app.get('/allDeposits',verifyToken.verificar,(req,res)=>{ 
        resp = depositoModel.getDepositos()
        .then(resp =>{
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
       app.get('/allDepositsOnlyverif',verifyToken.verificar,(req,res)=>{ 
        resp = depositoModel.getDepositosOnlyVerif()
        .then(resp =>{
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

 