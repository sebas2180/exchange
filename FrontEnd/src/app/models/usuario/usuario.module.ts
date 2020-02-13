  
import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepositoModule } from '../deposito/deposito.module';




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
  // depositos?: DepositoModule[];

}
