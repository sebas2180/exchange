import { Deserializable } from './../deserializable.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class TasaModule implements Deserializable{ 

  id:number;
  nombre:string;
  //create_at: Date=new Date();
  tasa_actual: number;
  createAt: Date =new Date();

  deserialize(input: any): this {
    // Assign input to our object BEFORE deserialize our cars to prevent already deserialized cars from being overwritten.
    return Object.assign(this, input);
  }
}
