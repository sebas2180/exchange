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

  getBeneficiarios(id: number): Observable<BeneficiarioModule>{
    const params = new HttpParams()
      .set('id_usuario',id.toString());
      return this.http.get<string>(`http://localhost:3000/getBeneficiarios/`,
      { params: params, observe: 'response'})
          .pipe(
          map((data => new BeneficiarioModule().deserialize(data))
        )
      )

  }
  deleteBeneficiario(id: number){
    const params = new HttpParams()
    .set('id',id.toString());
      return this.http.delete<string>('http://localhost:3000/deleteBeneficiario/',
      {params: params, observe:'response'});
  }
}
