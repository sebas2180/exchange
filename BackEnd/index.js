
const express = require('express');
const http = require('http');
const app = express();
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');
const body_parser = require('body-parser');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const multer  = require('multer');
const fs = require('fs');

const dbConnection = require('./database/mysql');
const conn  = dbConnection.dbConnection();

const server = http.createServer(app);
app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());
app.set('port',process.env.port||9000);
app.use(express.static(path.join(__dirname,'public')));
app.use(fileUpload());

////passport
const Sequelize =require('./passport/auth.js')(app,passport);
var crypto            = require('crypto');
var LocalStrategy     = require('passport-local').Strategy;
var sess              = require('express-session');
var Store             = require('express-session').Store;
var BetterMemoryStore = require('session-memory-store')(sess);

var store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true });
app.use(sess({
   name: 'JSESSION',
   secret: 'MYSECRETISVERYSECRET',
   store:  store,
   resave: true,
   saveUninitialized: true
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.options("/*", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});


  
var models = require('././database/usuarios')();
const dashBoardRoutes= require('./src/routes/dashBoardRoutes')(app,passport);
const usuarioRoute= require('./src/routes/usuarioRoute')(app,passport);
const depositoRoute= require('./src/routes/depositoRoutes')(app,passport);
const bancoRoute = require('./src/routes/bancoRoutes')(app,passport);
const tasaRoute = require('./src/routes/tasaRoutes')(app,passport);
const beneficiarioRoute = require('./src/routes/beneficiarioRoutes')(app,passport);
require('./database/sequelize');
const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>{//cambiar a 30000 en desarollo
    console.log('server conectado en el puerto: '+server.address().port)
});