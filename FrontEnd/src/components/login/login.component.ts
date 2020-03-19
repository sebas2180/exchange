
import { AuthserviceService } from './../../app/services/authservice.service';
import { UsuarioService } from '../../app/services/usuarioService.service';

import { UsuarioModule } from '../../app/models/usuario/usuario.module';
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModule;

  constructor(  private route : Router,private authService : AuthserviceService, private service: UsuarioService) { }

  ngOnInit() {
    if(this.service.canActivate()) {
      this.service.logeado = true;
      this.route.navigate(['/panel-usuario']); 
    }
    this.usuario = {
      usuario : '',
      password: '',
      pais :'',
      id: 0
      
    }
  }

  entrar(){
    console.log('ok');
    this.service.login(this.usuario).subscribe(
      res => { 
        if(res['status'] == ( 702 || 703) ) {
          console.log(res['success']);
        }
        const aux = res['user'];
        console.log(aux.rol);
        switch(aux.rol){
          case 'cliente':
                    this.authService.setUserInfo( res['user'] );
                    if(this.service.canActivate()){
                       this.service.logeado = true;
                       console.log('estado logeado:     '+this.service.logeado);
                      this.route.navigate(['/panel-usuario']);
                    };
          case 'administrador':
                this.authService.setUserInfo( res['user'] );
                if(this.service.canActivate()){
                  this.service.logeado = true;
                  this.route.navigate(['/panelAdministrador']);
                };
        }
        if(aux.rol == 'cliente'){

        }
      
      },
      err => {
        console.log(err);
        console.log(err[0]);
      }
    );
  };
}