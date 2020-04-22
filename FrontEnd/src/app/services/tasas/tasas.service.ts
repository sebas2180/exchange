import { AuthserviceService } from '../../services/authservice.service';
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
  constructor(private http: HttpClient,private route : Router,private AuthService :AuthserviceService) {
   }
  getTasas() {
      console.log('allDepositsOnlyverif');
      return this.http.get<TasaModule[]>(`${this.AuthService.ruta}getTasas`)
      .pipe(
        map((data => new TasaModule().deserialize(data))
        )
      )

  }
  updateTasa(TasaMo){
    return this.http.post(`${this.AuthService.ruta}updateTasa`,TasaMo);

  }
  getTasa(pais: string){
    console.log('pais tasa'+ pais);
    const params = new HttpParams()
    .set('pais',pais.toString());
    return this.http.get<any>(`${this.AuthService.ruta}getTasa`,
    {params:params,observe:'response'});
  }
  setTasa(res){
    const aux = res['body'];
    const aux2 = aux.tasa;
    this.Tasa=aux2;
  }
}
