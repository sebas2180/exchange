const passport = require('passport');
var flash             = require('connect-flash');
var crypto            = require('crypto');

var LocalStrategy     = require('passport-local').Strategy;
var sess              = require('express-session');
var Store             = require('express-session').Store;
const mysql = require('../database/mysql');
const User = require('../src/models/usuarioModel');
const connection = mysql.dbConnection();
 function ps(app,passport) {
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done){
      console.log('hola');
        connection.query("select * from usuarios where id = "+ id, function (err, rows){
            done(err, rows[0]);
        });
    });
    passport.use('local', new LocalStrategy({
      usernameField: 'usuario',
      passwordField: 'password',
      passReqToCallback: true //passback entire req to call back
    } , function (req, usuario, password, done){
      console.log(usuario);
          if(!usuario || !password ) { return done(null, false, req.flash('message','All fields are required.')); }
          var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
          console.log("select * from usuarios where usuario = ?", [usuario]);
          connection.query("select * from usuarios where usuario = ?", [usuario], function(err, rows){ 
              console.log(rows);
            if (err) return done(req.flash('message',err));
            if(!rows.length){ return done(null, false, req.flash('message','Invalid username or password.')); }
            salt = salt+''+password;
           
            var encPassword = crypto.createHash('sha1').update(salt).digest('hex');
            var dbPassword  = rows[0].password;
            console.log(dbPassword);
            console.log(encPassword);
            if(!(dbPassword == encPassword)){
                return done(null, false, req.flash('message','Invalid username or password.'));
             }
            return done(null, rows[0]);
          });
        }
    ));
      }
      module.exports = ps;
