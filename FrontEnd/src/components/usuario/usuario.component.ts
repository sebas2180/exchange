import { UsuarioService } from './../../app/services/usuarioService.service';
import { UsuarioModule } from '../../app/models/usuario/usuario.module';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  usuario: UsuarioModule;
  constructor(private service: UsuarioService) { 
  }

  ngOnInit() {
    this.service.canActivate();
    this.usuario = {
      usuario: 'Sebastian',
      password:'****',
      saldo:12000,
      pais:'Argentina',
      tasa:0
    }
  }

}
