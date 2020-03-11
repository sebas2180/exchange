import { AuthserviceService } from './../../app/services/authservice.service';
import { DepositoService } from 'src/app/services/deposito/deposito.service';
import { UsuarioService } from './../../app/services/usuarioService.service';
import { UsuarioModule } from '../../app/models/usuario/usuario.module';
import { Component, OnInit } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  cantidad_depositos : number;
  usuario: UsuarioModule;
  constructor(private authService: AuthserviceService, private depService : DepositoService,private service: UsuarioService) { 
  }

  ngOnInit() {
    this.service.canActivate();
    this.usuario = {
      usuario: 'Sebastian',
      password:'****',
      saldo:12000,
      pais:'Argentina',
      id:0    }
    this.cantidad_depositos=0;
    const data = JSON.parse(this.authService.getLocal());
    this.depService.getEstadisticasDelUsuario(data['id']).subscribe(
      res => {
        const a =JSON.parse(res['body']);
       
          this.cantidad_depositos= (a[0].cantidad);

        
      },
      err => {
        console.log(err);
      }
    )
  
  }

}
