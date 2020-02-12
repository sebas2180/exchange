import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UsuarioModule { 

  usuario: string;
  password: string;
  pais: string;
  tasa?: number;
  saldo?: number;

  // constructor( usuario:string, password:string, pais:string, tasa?, saldo?) {
  //   this.usuario = usuario;
  //   this.password = password;
  //   this.pais = pais;
  //   this.tasa = 0 || this.tasa;
  //   this.saldo = 0 || this.saldo;
  // }
}
