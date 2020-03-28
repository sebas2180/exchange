import { BarraSuperiorService } from './../../app/services/barra-superior/barra-superior.service';

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
  titulo: string ;
  constructor(  private barraService: BarraSuperiorService,
    private route : Router,private authService : AuthserviceService, private service: UsuarioService) { 
      this.titulo ='BIZCA EXCHANGE';
    }

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
        console.log(res);
        if(res['status'] == ( 702 || 703) ) {
          console.log(res['user']);
        }
        const aux = res['user'];
        console.log(aux.rol);
        switch(aux.rol){
          case "cliente":
                    //this.barraService.setTitulo('PANEL USUARIO');
                    this.authService.setUserInfo( res['user'] );
                    console.log('MENU CLIENTE');
                       this.service.logeado = true;
                       console.log('estado logeado:     '+this.service.logeado);
                      this.route.navigate(['/panel-usuario']);
          break;
          case "administrador":
                
                //this.barraService.setTitulo('PANEL ADMINISTRADOR');
                this.authService.setUserInfo( res['user'] );
                console.log('MENU ADM');
                  this.service.logeado = true;
                  this.route.navigate(['/panelAdministrador']);
          break;
        }
      },
      err => {
        console.log(err);
        console.log(err[0]);
      }
    );
  };
}