import { Router } from '@angular/router';

import { AuthserviceService } from './../../app/services/authservice.service';
import { UsuarioService } from './../../app/services/usuarioService.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'comprobar',
  templateUrl: './comprobar.component.html',
  styleUrls: ['./comprobar.component.scss']
})
export class ComprobarComponent implements OnInit {

  constructor(private route : Router,private authService : AuthserviceService, private service: UsuarioService) { }

  ngOnInit(): void {

    if(this.service.canActivate()) {
      this.service.logeado = true;
      this.service.isCliente();
      this.service.isAdministrador();
    }else{
      this.route.navigate(['/login']);
    }

  }

}
