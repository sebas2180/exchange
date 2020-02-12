
import { AuthserviceService } from './../../app/services/authservice.service';
import { UsuarioService } from '../../app/services/usuarioService.service';

import { UsuarioModule } from '../../app/models/usuario/usuario.module';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {  DialogoDesconectadoComponent } from '../dialogo-desconectado/dialogo-desconectado.component';

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
      pais :''
    }
  }

  entrar(){
    this.service.login(this.usuario).subscribe(
      res => { 
        if(res['status'] == ( 702 || 703) ) {
          console.log(res['success']);
        }
        this.authService.setUserInfo( res['user'] );
        if(this.service.canActivate()){
          this.service.logeado = true;
          console.log('estado logeado:     '+this.service.logeado);
          this.route.navigate(['/panel-usuario']);
        }
      },
      err => {
        console.log(err);
        console.log(err[0]);
      }
    );
  };
}