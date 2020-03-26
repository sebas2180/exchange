import { UsuarioService } from './../../app/services/usuarioService.service';
import { UsuarioModule } from './../../app/models/usuario/usuario.module';
import { DepositoModule } from 'src/app/models/deposito/deposito.module';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'show-remitente',
  templateUrl: './show-remitente.component.html',
  styleUrls: ['./show-remitente.component.scss']
})
export class ShowRemitenteComponent implements OnInit {
  @Input() deposito: DepositoModule;
  usuario: UsuarioModule;
  constructor(private UsuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.UsuarioService.getUsuario(this.deposito.id_user).subscribe(
      res=>{
        const aux = res['body'];
        this.usuario= aux['usuario'];
      }
    )
  }

}
