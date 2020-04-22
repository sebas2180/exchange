import { UsuarioService } from './../../app/services/usuarioService.service';
import { AuthserviceService } from './../../app/services/authservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'barra-inferior',
  templateUrl: './barra-inferior.component.html',
  styleUrls: ['./barra-inferior.component.scss']
})
export class BarraInferiorComponent implements OnInit {

  constructor(private authService: AuthserviceService,private service: UsuarioService) { }

  ngOnInit(): void {
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
