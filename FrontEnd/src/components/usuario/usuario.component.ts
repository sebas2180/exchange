import { ActivatedRoute, Params } from '@angular/router';
import { BarraSuperiorService } from './../../app/services/barra-superior/barra-superior.service';
import { TasasService } from './../../app/services/tasas/tasas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioModule } from './../../app/models/usuario/usuario.module';
import { AuthserviceService } from './../../app/services/authservice.service';
import { DepositoService } from 'src/app/services/deposito/deposito.service';
import { UsuarioService } from './../../app/services/usuarioService.service';
 
import { Component, OnInit, Input } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { trigger, style, state, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  animations:[
    trigger('enterState',[
      state('void',style({
        transform:'translateX(-100%)',
        opacity:0
      })),
      transition(':enter',[
        animate('0.5s',style({
          transform:'translateX(0)',
        opacity:1
        }))
      ])
    ]),
    trigger('enterStateRight',[
      state('void',style({
        transform:'translateX(200%)',
        opacity:0
      })),
      transition(':enter',[
        animate('0.5s',style({
          transform:'translateX(0)',
        opacity:1
        }))
      ])
    ]),
    trigger('enterStateBotton',[
      state('void',style({
        transform:'translateY(200%)',
        opacity:0
      })),
      transition(':enter',[
        animate('0.5s',style({
          transform:'translateY(0)',
        opacity:1
        }))
      ])
    ])
   
  ]
})
export class UsuarioComponent implements OnInit {

  titulo: string ='PANEL USUARIO';
  cantidad_depositos : number;
  ultimo_mes: number;
  usuario: UsuarioModule = new UsuarioModule();
  form: FormGroup;
  verUsuario:boolean=false;
  newUsuario(usuario){
    console.log('-----');
    console.log(usuario);
    this.form =new FormGroup({
    id: new FormControl(usuario['id'],[Validators.required]),
    usuario: new FormControl(usuario['usuario'],[Validators.required]),
    pais: new FormControl(usuario['pais'],[Validators.required]),
    email: new FormControl(usuario['email'],[Validators.required]),
    password: new FormControl(usuario['password'],[Validators.required]),
    create_at: new FormControl(usuario['create_at']),
    nombre: new FormControl(usuario['nombre']),
    apellido: new FormControl(usuario['apellido']),
    rol: new FormControl(usuario['rol']),
    tasa: new FormControl(usuario['tasa']),
    saldo: new FormControl(usuario['saldo']),
    status: new FormControl(usuario['status']),
    tipo_documento: new FormControl(usuario['tipo_documento']),
    nro_documento: new FormControl(usuario['nro_documento']),
    telefono: new FormControl(usuario['telefono'])
    })
  }
  constructor(private authService: AuthserviceService, 
              private depService : DepositoService,
              public service: UsuarioService,
              private route: ActivatedRoute,
              private TasasService: TasasService,
              public BarraSuperiorService: BarraSuperiorService) { 
                this.TasasService.getTasas().subscribe(
                  res=>{
                    console.log(res);
                  },
                  err=>{
                    console.log('errrrrrrrr');
                  }
                )
              


    this.cantidad_depositos=0;
    const data = JSON.parse(this.authService.getLocal());
    this.service.getUsuario(data['id']).subscribe(
      res=>{
        const aux = res['body'];
        const aux1= aux['usuario'];
        this.usuario =aux1[0] ;
        console.log(aux['usuario']);
        this.newUsuario(aux['usuario']);
        this.configuraciones();
                  //  ////
                  //  this.route.queryParams.subscribe(
                  //   params=>{
                  //   console.log(params['verUsuario']);
                  //   if(!params){
                  //     this.verUsuario=params['verUsuario'];
                  //     alert(this.verUsuario)
                  //   }
                  //   }
                  // )
                  // ///
        this.depService.getEstadisticasDelUsuario(data['id']).subscribe(
          res => {
            const aux= (res['body']);
            const aux2 = aux['msj'];
            this.cantidad_depositos= aux2['total'];
            this.ultimo_mes = aux2['ultimo_mes'];
          },
          err => {
            console.log(err);
          }
        )
        this.service.canActivate();
        this.service.isCliente();
      },
      err =>{
        console.log(err);
      }
    )
    
  }

  ngOnInit() {

  }

  changeVentana(e){
    // if(this.titulo=="PANEL USUARIO"){
    //   this.titulo="MIS DATOS";
    // }else{
    //   this.titulo="PANEL USUARIO";
    // }
    if(this.BarraSuperiorService.volver){
      this.BarraSuperiorService.volver=false;;
      this.titulo="MIS DATOS";
    }else{
      this.verUsuario=true;
      this.service.panelPrincipal=true;
      this.BarraSuperiorService.volver=true;
      this.titulo="PANEL USUARIO";
    }
     
    this.verUsuario=e;
    this.service.panelPrincipal=e;
  }
  configuraciones(){
    this.usuario = {
      pais: this.form.get('pais').value,
      usuario: this.form.get('usuario').value,
      password: this.form.get('password').value,
      nombre: this.form.get('nombre').value,
      apellido: this.form.get('apellido').value,
      telefono: this.form.get('telefono').value,
      email: this.form.get('email').value,
      status: this.form.get('status').value,
      saldo: this.form.get('saldo').value,
      tipo_documento: this.form.get('tipo_documento').value,
      nro_documento: this.form.get('nro_documento').value,
      rol: this.form.get('rol').value,
      id: this.form.get('id').value,
      create_at: this.form.get('create_at').value
      }

    this.verUsuario=true;
    this.service.panelPrincipal=true;
   
  }
  salir() {
    this.service.logOut().subscribe(
      res => { 
        this.authService.clearLocalStorage();
        console.log(res);
        this.service.canActivate();

        this.service.logeado =  false;
        console.log('this.service.logeado     :'+this.service.logeado);

      },
      err => {

      });
  }
}
