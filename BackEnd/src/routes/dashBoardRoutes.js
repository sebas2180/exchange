const mysql = require('mysql2');
const dashBoardModel = require('../models/dashBoardModel');

function dashBoardRoutes(app,passport) {
    
    app.post('/prueba',(req,res)=>{
        console.log(req.body.file);
        dashBoardModel.prueba(req.body.file)
     .then(resp =>{
        console.log('hola');
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
}

module.exports= dashBoardRoutes;