import { UsuarioService } from './../../app/services/usuarioService.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialogo-desconectado',
  templateUrl: './dialogo-desconectado.component.html',
  styleUrls: ['./dialogo-desconectado.component.scss']
})
export class DialogoDesconectadoComponent implements OnInit {
  desconectado: boolean = false;
  constructor( private service: UsuarioService) { }

  ngOnInit() {
  }

  cerrarVentanaDialogo() {
    console.log('click');
    this.desconectado = true;
    this.service.desconectado = true;
  }

}
