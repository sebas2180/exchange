
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
    }else{
      this.service.logeado = false;
    }
    var date = new Date();
    this.usuario = {
      usuario : '',
      password: '',
      pais :'',
      apellido :'',
      nombre :'',
      status :'',
      telefono :'',
      rol :'',
      create_at :date,
      id: 0
      
    }
  }
  

  entrar(){
    console.log('ok');
    this.service.login(this.usuario).subscribe(
      res => {
        console.log(res['user']);
        if(res['status'] == ( 702 || 703) ) {
          console.log(res['success']);
        }
        const aux = res['user'];
        console.log(aux.rol);
        switch(aux.rol){
          case "cliente":
                    this.authService.setUserInfo( res['user'] );
                    console.log('MENU CLIENTE');
                       this.service.logeado = true;
                       console.log('estado logeado:     '+this.service.logeado);
                      this.route.navigate(['/panel-usuario']);
          break;
          case "administrador":
                this.authService.setUserInfo( res['user'] );
                console.log('MENU ADM');
                  this.service.logeado = true;
                  this.route.navigate(['/panelAdministrador']);
          break;
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