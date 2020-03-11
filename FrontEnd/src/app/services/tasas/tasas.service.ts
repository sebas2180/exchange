import { CanActivate, Router } from '@angular/router';
import { TasaModule } from './../../models/tasa/tasa.module';

import { Deserializable } from './../../models/deserializable.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasasService {
  Tasa: TasaModule;
  Tasas: TasaModule[];
  constructor(private http: HttpClient,private route : Router) {
   }
   getTasas(){
     const params = new HttpParams();
    return this.http.get<any>(`http://localhost:3000/getTasas`,
    {params:params,observe:'response'}).pipe(
      map(data=>{
        new TasaModule().deserialize(data);
      })
    );
  }
  getTasa(pais: string){
    console.log('pais tasa'+ pais);
    const params = new HttpParams()
    .set('pais',pais.toString());
    return this.http.get<any>(`http://localhost:3000/getTasa`,
    {params:params,observe:'response'});
  }
  setTasa(res){
    const aux = res['body'];
    const aux2 = aux.tasa;
    this.Tasa=aux2;
  }
}
