import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class TasaModule { 

  id:number;
  nombre:string;
  create_at?: Date=new Date();
  tasa_actual: boolean;

  deserialize?(input: any): this {
    return Object.assign(this, input);
  }
}
