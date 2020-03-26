const beneficiarioModel = require('../models/beneficiarioModel');

function beneficiarioRoute(app,passport) {

    app.get('/getBeneficiarios',isAuthenticated,(req,res) =>{
        beneficiarioModel.getBeneficiarios(req.query.id_usuario)
        .then(
            resp=>{
                if(!resp){
                    console.log('null');

                    const sendInfo={
                        status: 706,
                        msj: 'Ops!.No se encontraron beneficiarios',
                        beneficiario: ''
                      }
                    //   console.log(sendInfo);
                      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                      return res.end(JSON.stringify(sendInfo));

                }else{
                    const sendInfo={
                        status: 707,
                        msj: 'Perfecto!, se han encontrado beneficiarios',
                        beneficiario: resp
                      }
                    //   console.log(sendInfo);
                      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                      return res.end(JSON.stringify(sendInfo));
                }
            }
        )
        .catch(
            err =>{
                console.log(err);
            }
        )

    });
    app.put('/addBeneficiario',isAuthenticated,(req,res) =>{
        beneficiarioModel.addBeneficiario(req.body)
        .then(
            resp=>{
                      console.log(resp);
                      return res.end(JSON.stringify(resp));
            }
        )
        .catch(
            err =>{
                console.log(err);
            }
        )
    });
    app.delete('/deleteBeneficiario',isAuthenticated,(req,res,next)=>{
        beneficiarioModel.deleteBeneficiario(req.query.id)
        .then(
            resp=>{
                // console.log(resp);
                res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                return res.end(JSON.stringify(resp));
            }
        )
    });
    app.get('/getBeneficiario',(req,res) =>{
        console.log('EWEEEEEEEEEEE');
        beneficiarioModel.getBeneficiario(req.query.id_beneficiario)
        .then(
            resp=>{
                if(!resp){
                    console.log('null');
                    const sendInfo={
                        status: 706,
                        msj: 'Ops!.No se encontraron beneficiarios',
                        beneficiario: ''
                      }
                    //   console.log(sendInfo);
                      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                      return res.end(JSON.stringify(sendInfo));

                }else{
                    const sendInfo={
                        status: 707,
                        msj: 'Perfecto!, se han encontrado beneficiarios',
                        beneficiario: resp
                      }
                    //   console.log(sendInfo);
                      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                      return res.end(JSON.stringify(sendInfo));
                }
            }
        )
        .catch(
            err =>{
                console.log(err);
            }
        )

    });
}
module.exports  = beneficiarioRoute;

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated())
    console.log('aut');
      return next();

}