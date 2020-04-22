const bancoModel = require('../models/bancoModel');

function bancoRoutes(app,passport) {
    app.get('/getBancos',isAuthenticated,(req,res,next)=>{
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

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated())
    console.log('aut');
      return next();

}