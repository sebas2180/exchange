const mysql = require('mysql2');
const dashBoardModel = require('../models/dashBoardModel');
const multer  = require('multer');
 var upload = multer({ dest: '/tmp/' });
const DIR     = 'FrontEnd/src/assets/imagenes/comprobantes/'; 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('dest');
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    let fileName = file.originalname.toLowerCase().split(' ').join('-');
    fileName = fileName.replace(/(\.[\w\d_-]+)$/i, '_' + Date.now() + '$1');
    console.log('ombre de archivo'+fileName);
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
      console.log('fileFilter');
      cb(null, true);
    } else {
      req.fileTypeValidationError = 'Only .png, .jpg and .jpeg format allowed!'
      //cb(null, false);
      return cb(null, false, req.fileTypeValidationError);
    }
  }
});
function dashBoardRoutes(app,passport) {
    app.post('/prueba',isAuthenticated,upload.single('photo'),function(req,res){
      if(req.fileTypeValidationError) {
        console.log('rerrerere');
          let resp = {
          status: "fail",
          statusMessage: req.fileTypeValidationError,
          data: []
          }
            res.send(resp);
            return false;
          }
          console.log('rerrerere');
        dashBoardModel.prueba(req.body, req.files.photo.name)
       .then(resp =>{
      console.log(resp);
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
     });
    });   
    /////////////////////////////////////////////////////////////////////////
    app.post('/upploadInfo',isAuthenticated,(req,res,next)=>{
      console.log(req.body);
      dashBoardModel.upploadInfo(req.body).then(
        response=>{
          console.log(response);
          return res.send(response);
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