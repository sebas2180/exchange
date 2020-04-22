  
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
  nombre?: string;
  apellido?: string;
  rol?: string;
  status?: string;
  create_at?: Date;
  tasa?: Date;
  tipo_documento ?: string;
  nro_documento?: string;
  deserialize?(input: any): this {
    return Object.assign(this, input);
  }

  isUsuarioConfirmado?= ()=>{
    console.log(this.telefono+'    '+this.nombre+'    '+ this.apellido +'    '+  this.nro_documento
    +'    '+ this.tipo_documento +'    '+this.nro_documento +'    '+this.tipo_documento);
    if(this.telefono && this.nombre && this.apellido &&  this.nro_documento
             && this.tipo_documento && this.nro_documento && this.tipo_documento){
      return true;
    }else{
      return false;
    }
  }
}
