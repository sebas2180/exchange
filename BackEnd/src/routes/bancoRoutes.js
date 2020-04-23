const bancoModel = require('../models/bancoModel');

function bancoRoutes(app,passport) {
    app.get('/getBancos',verifyToken.verificar,(req,res,next)=>{
         bancos = bancoModel.getBancos()
         .then(
             resp=>{
                 
                  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                  return res.end(JSON.stringify(resp)); 
             }
         )
        
    });
}
module.exports = bancoRoutes;

 