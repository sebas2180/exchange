const mysql = require('mysql2');
const dashBoardModel = require('../models/dashBoardModel');
const multer  = require('multer');
 var upload = multer({ dest: '/tmp/' });
const DIR     = 'src/assets/imagenes/comprobantes/'; 
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    let fileName = file.originalname.toLowerCase().split(' ').join('-');
    fileName = fileName.replace(/(\.[\w\d_-]+)$/i, '_' + Date.now() + '$1');
    cb(null, fileName)
  }
});
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      req.fileTypeValidationError = 'Only .png, .jpg and .jpeg format allowed!'
      //cb(null, false);
      return cb(null, false, req.fileTypeValidationError);
    }
  }
});

crear_nombre =(photo)=>{
  var nombre=photo.name;
  if (photo.mimetype == "image/png"){
    //var aux =photo.name.replace('.PNG','');
    nombre='comprobante-'+Date.now()+'.PNG'
    console.log(nombre);
  }
  if (photo.mimetype == "image/jpeg"){
    //var aux =photo.name.replace('.JPEG','');
    nombre='comprobante-'+Date.now()+'.JPEG'
    console.log(nombre);
  }
  if (photo.mimetype == "image/jpg"){
    //var aux =photo.name.replace('.JPG','');
    nombre='comprobante-'+Date.now()+'.JPG'
    console.log(nombre);
  }
  return nombre;
 }
function dashBoardRoutes(app,passport) {
    // app.post('/prueba',upload.single('photo'),function(req,res){

    //     if(req.fileTypeValidationError) {
    //         let resp = {
    //           status: "fail",
    //           statusMessage: req.fileTypeValidationError,
    //           data: []
    //         }
    //         res.send(resp);
    //         return false;
    //       }
    // dashBoardModel.prueba(req.body, req.file)
    //    .then(resp =>{
    //   //console.log(resp);
    //     if(resp != undefined){
    //     res.send(JSON.stringify(resp));
    //     }
    //     if(resp == undefined){
    //         const response = {
    //             status: 600,
    //             msj: "No se ha encontrado usuario"
    //         }
    //         res.send(response);   
    //     } 
    //   })
    // }); 

    app.post('/prueba', function(req, res) {
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
       var startup_image = req.files.photo;
       var fileName = crear_nombre(req.files.photo) ;
       // Use the mv() method to place the file somewhere on your server
       startup_image.mv(path.join( 'src/assets/imagenes/comprobantes/'+fileName) , function(err) {
         if(err){
           console.log(err);
         }else{
          dashBoardModel.prueba(fileName, req.files.photo)
          .then(resp =>{
         //console.log(resp);
           if(resp != undefined){
           res.send(JSON.stringify(resp));
           }
           if(resp == undefined){
               const response = {
                   status: 600,
                   msj: "No se ha encontrado usuario"
               }
               res.send(response);   
           } 
         })
        console.log("uploaded");
    }
       });
     });

    /////////////////////////////////////////////////////////////////////////
    app.post('/upploadInfo',isAuthenticated,(req,res,next)=>{
     // console.log(res);
      dashBoardModel.upploadInfo(req.body).then(
        response=>{
          console.log(response);console.log(response);
           res.send(JSON.stringify(response));
           
        },err=>{
          console.log(err)
        }
      )
      
    }); 
    //////////////////////////////////////////////
    app.get('/getDashboard',isAuthenticated,(req,res,next)=>{
      console.log(req.query.id_deposito);
      dashBoardModel.getDashboard(req.query.id_deposito).then(
        resp=>{
          res.send(JSON.stringify(resp));
        }
      )
    })
  }

module.exports= dashBoardRoutes;

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated())
  console.log('aut');
    return next();

}