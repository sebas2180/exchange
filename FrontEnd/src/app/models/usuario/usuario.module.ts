  
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
  id?: number;
  usuario: string;
  password: string;
  pais: string;
  saldo?: number;
  email?:string;
  telefono?:string;

  deserialize?(input: any): this {
    return Object.assign(this, input);
  }

}
