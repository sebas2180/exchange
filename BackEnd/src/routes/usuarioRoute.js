const usuarioModel = require('../../src/models/usuarioModel');
const mysql = require('../../database/mysql');
const conn = mysql.dbConnection();
    function usuarioRoute(app,passport){
    usuarioModel.getUsuarios();

    app.get('/prueba',(req,res) => {
        res.send({status:501,
            msj:"esto es una prueba"});
    });
    
    app.get('/panelUser',isAuthenticated, (req, res, next) => {
        res.render('profile');
      });

    app.post('/login', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
          if (err) { return next(err); }
          console.log(user['id']);
          if (!user){
            console.log('no logeado');
             { const devolver={
             status:702,
             success:'usuario no existente'
          }
          return res.send(JSON.stringify(devolver)); }
          }else{
            req.logIn(user, function(err) {
              if (err) { return next(err); }
              console.log('logeado');
              const devolver={
                status:703,
                success:'usuario logeado',
                user: user
              }
              res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
              return res.send(JSON.stringify(devolver));
            });
          }
         
        })(req, res, next);
        
      });

      app.get('/logout',isAuthenticated, (req, res, next) => {
        console.log('desconexion');
        req.logout();
        req.session.destroy(function (err) {
          const sendInfo={
            status: 999,
            url:'Desconexion correcta'
          }
          console.log(sendInfo.url);
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
           return res.end(JSON.stringify(sendInfo.url));
      });
      });

    app.post('/ea',(req,res)=>{
        console.log('hodddla');
    });

        function isAuthenticated(req, res, next) {
            if (req.isAuthenticated())
            console.log('aut');
              return next();

        }
}

module.exports = usuarioRoute;