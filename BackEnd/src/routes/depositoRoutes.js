const mysql = require('mysql2');
const depositoModel = require('../models/depositoModel');

function depositosRoutes(app,passport) {
    
    app.get('/allDepositsForUser',(req,res)=>{ 
        console.log(req.query);
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

    
}

module.exports= depositosRoutes;