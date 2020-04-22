
import { BeneficiarioModule } from './../../models/beneficiario/beneficiario.module';
import { Injectable } from '@angular/core';
import { AuthserviceService } from './../authservice.service';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService {

  constructor(private http: HttpClient,private authService: AuthserviceService, private route : Router) { }

  beneficiarios: BeneficiarioModule[];
  
  CanActivate(){
    console.log('CAN ACTIVATE ');
    if(this.authService.isAuthenticatede()){
      console.log('canActivate:  '+ this.authService.isAuthenticatede());
      return true;
    }
    this.route.navigate(['login']);
    return false;
  }

  addBeneficiario(form: FormData){
    console.log(form);
    return this.http.put(`${this.authService.ruta}addBeneficiario/`,form);
  }
  getBeneficiarios(id: number): Observable<BeneficiarioModule>{
    const params = new HttpParams()
      .set('id_usuario',id.toString());
      return this.http.get<string>(`${this.authService.ruta}getBeneficiarios/`,
      { params: params, observe: 'response'})
          .pipe(
          map((data => new BeneficiarioModule().deserialize(data))
        )
      )

  }
  getBeneficiario(id_beneficiario: number){
    const params = new HttpParams()
      .set('id_beneficiario',id_beneficiario.toString());
      return this.http.get<string>(`http://localhost:3000/getBeneficiario/`,
      {params: params, observe:'response'});
      
  }
  deleteBeneficiario(id: number){
    const params = new HttpParams()
    .set('id',id.toString());
      return this.http.delete<BeneficiarioModule>('http://localhost:3000/deleteBeneficiario/',
      {params: params, observe:'response'});
  }
}
