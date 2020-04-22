import { AuthserviceService } from './../../app/services/authservice.service';
import { UsuarioService } from './../../app/services/usuarioService.service';
import { UsuarioModule } from './../../app/models/usuario/usuario.module';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comprobar-datos',
  templateUrl: './comprobar-datos.component.html',
  styleUrls: ['./comprobar-datos.component.scss']
})
export class ComprobarDatosComponent implements OnInit {

  ok:boolean =false;
  usuario: UsuarioModule;
  titulo:string = "MIS DATOS";
  constructor(private service: UsuarioService,
              private authService: AuthserviceService,
              private router: Router) {
    this.authService.isAuthenticatede();
    const data = JSON.parse(this.authService.getLocal());
    this.service.getUsuario(data['id']).subscribe(
      res=>{
        const aux = res['body'];
        this.usuario =aux['usuario'] ;
        console.log(aux['usuario']);
        this.ok=true;
      });
      
   }

  ngOnInit(): void {
  }
  changeVentana(e){
    this.router.navigate(['/transferencias']);
  }
  volver_transferencia(e){
    this.router.navigate(['/transferencias']);
  }

}
