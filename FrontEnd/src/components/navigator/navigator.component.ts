import { AuthserviceService } from './../../app/services/authservice.service';
import { UsuarioService } from './../../app/services/usuarioService.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {
  logeado ;
  constructor(public service: UsuarioService, public auth: AuthserviceService) {

    console.log('this.service.logeado     :'+this.service.logeado);
   ///this.auth.clearLocalStorage();
  }

  ngOnInit( ) {
    this.logeado = this.service.logeado;
  }

  salir() {
    this.service.logOut().subscribe(
      res => { 
        this.auth.clearLocalStorage();
        console.log(res);
        this.service.canActivate();
        this.logeado = false;
        this.service.logeado =  this.logeado;
        console.log('this.service.logeado     :'+this.service.logeado);

      },
      err => {

      });
  }


}
