const bancoModel = require('../models/bancoModel');

function bancoRoutes(app,passport) {
    app.get('/getBancos',isAuthenticated,(req,res,next)=>{
         bancos = bancoModel.getBancos()
         .then(
             resp=>{
                const sendInfo={
                    status: 999,
                    bancos: resp
                  }
                  console.log(sendInfo);
                  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                  return res.end(JSON.stringify(sendInfo.bancos)); 
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