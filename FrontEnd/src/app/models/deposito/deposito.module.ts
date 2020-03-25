import { Deserializable } from './../deserializable.model';
import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DepositoModule implements Deserializable{ 
  id?: number;
  fecha?: Date;
  pais?: string;
  status?: string;
  create_at?:  Date=new Date();
  id_user?: number;
  monto?: number;
  tasa?: number;

  setDeposito(pais: string, id_user: number,monto: number,tasa: number){
    this.id_user=id_user;
    this.fecha= new Date();
    this.status= 'EN VERIFICACION';
    this.create_at= new Date();
    this.pais= pais;
    this.tasa= tasa;
    this.monto = monto;
  }
  deserialize(input: any): this {
    // Assign input to our object BEFORE deserialize our cars to prevent already deserialized cars from being overwritten.
    return Object.assign(this, input);
  }

}
