

const TasaModule = require('../models/tasaModel');



function tasaRoutes(app,passport){
    app.get('/getTasas',verifyToken.verificar,(req,res,next)=>{
        TasaModule.getTasas()
        .then(
            resp=>{
                return res.end(JSON.stringify(resp));
            })
    }),
    app.post('/updateTasa',verifyToken.verificar,(req,res)=>{
        TasaModule.updateTasa(req)
        .then(
            resp=>{
                console.log(resp);
                res.send(resp);
            }
        );
        
    }),
    app.get('/getTasa',verifyToken.verificar,(req,res,next)=>{
        console.log('gettasa');
        TasaModule.getTasa(req.query.pais)
        .then(
            resp=>{
               // console.log(resp);
                if(resp){
                const sendInfo={
                    status: 711,
                    msj: 'Perfecto!, se han encontrado las tasas actuales',
                    tasa: resp
                }
                console.log(sendInfo);
                res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                
                return res.end(JSON.stringify(sendInfo));
            }else{
                console.log('null');
          const sendInfo={
              status: 712,
              msj: 'Ops!.No se encontraron las tasas actuales',
              tasa: ''
            }
            console.log(sendInfo);
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            return res.end(JSON.stringify(sendInfo));
            }
            })
    });


}
module.exports=tasaRoutes;
 