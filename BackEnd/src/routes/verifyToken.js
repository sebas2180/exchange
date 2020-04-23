
const express= require('express');
const app = express();
const config = require('../config/config');
app.set('llave', config.llave);
module.exports = {
      login: function (usuario,rol,cb) {
        const payload = {
            check:  true,
            usuario:  usuario,
            rol:rol
           };
           const token = jwt.sign(payload, app.get('llave'), {
            expiresIn: 2000
           });
          // console.log(jwt.verify(token,app.get('llave')));
           console.log(`token:  ${token}`);
           return cb(token);
    },
    verificar : (req,res,next)=>{
        if(!req.headers.authorization){
            const sendInfo={
                status: 760,
                msj:'Error en token'
            }
            console.log('alt 4');
            res.send(sendInfo);
        }
       // console.log(req.headers.authorization);
        var token = req.headers.authorization.split(' ')[1];
        token = token.split('"')[1];
        //console.log('token   ' +token);
        var usuario = req.headers.authorization.split(' ')[2];
        usuario = usuario.split('\"')[1];
        //onsole.log('tokenVerif:  ' +token);
        console.log(usuario);
        if(token == null){
            const sendInfo={
                status: 760,
                msj:'Error en token'
            }
            console.log('alt 1');
            res.send(sendInfo);
        }
        try{
        ( jwt.verify(token,app.get('llave')),(err,resp)=>{
        if(err){
            console.log('err')
            const sendInfo={
            status: 760,
            msj:'Error en token'
            }
            console.log(resp);
            console.log('alt 2');
            res.send(sendInfo);
        }
        console.log(resp);
        console.log('alt 3');
        req.payload = {
            check:  true,
            usuario:  usuario
        };
        next();
    })
        req.payload = {
            check:  true,
            usuario: usuario
        };
        next();
        }catch(err){
            console.log(err)
            const sendInfo={
                status: 760,
                msj:'Error en token'
            }
            console.log('alt 3');
            res.send(sendInfo);
        }
      }
}

