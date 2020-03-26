import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { 
  
  id:number;
  imagen: Blob;
  create_at: Date;
  id_deposito:number;
  
  deserialize?(input: any): this {
    return Object.assign(this, input);
  }
}


