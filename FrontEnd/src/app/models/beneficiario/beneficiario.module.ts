import { NgModule } from '@angular/core';
import { CommonModule, NumberFormatStyle } from '@angular/common';
import { Deserializable } from './../deserializable.model';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class BeneficiarioModule { 

  id?: number;
  nombre: string;
  apellido: string;
  tipo_cuenta: string;
  nro_cuenta: number;
  tipo_documento: string;
  nro_documento: number;
  banco: string;
  create_at?: Date;
  id_usuario: number;
  id_destinatario: number;
  deserialize(input: any): this {
    // Assign input to our object BEFORE deserialize our cars to prevent already deserialized cars from being overwritten.
    return Object.assign(this, input);
  }

}
