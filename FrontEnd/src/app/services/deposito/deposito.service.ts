import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { AuthserviceService } from './../authservice.service';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DepositoModule } from 'src/app/models/deposito/deposito.module';
import {map} from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class DepositoService  {

  isViewTable:boolean=false;
  
  constructor(private http: HttpClient,private authService: AuthserviceService, private route : Router) { 


  }
  CanActivate(){
    console.log('CAN ACTIVATE ');
    if(this.authService.isAuthenticatede()){
      console.log('canActivate:  '+ this.authService.isAuthenticatede());
      return true;
    }
    this.route.navigate(['login']);
    return false;
  }

getEstadisticasDelUsuario(id: number){
const params = new HttpParams()
  .set('id_user',id.toString());
    return this.http.get<string>(`http://localhost:3000/EstadisticasDelUsuario/`,
    {params: params,observe: 'response'});
  }
  getAllDepositosForUser(id: number): Observable<DepositoModule>{
    console.log('getAllDepositosForUser');
      console.log('service consola');
      const params = new HttpParams()
      .set('id', id.toString());
        return this.http.get<DepositoModule[]>(`http://localhost:3000/allDepositsForUser/`,{
          params: params ,observe: 'response'}).pipe(
            map((data => new DepositoModule().deserialize(data))
            )
          )
  }
  getAllDepositosForBeneficiario(id_user: number, id_beneficiario: number): Observable<DepositoModule>{
    console.log('getAllDepositosForBeneficiario');
    console.log('service consola');
    const params = new HttpParams()
    .set('id_destinatario', id_user.toString())
    .set('id_user', id_beneficiario.toString());
      return this.http.get<DepositoModule[]>(`http://localhost:3000/allDepositsForDestinatario/`,{
        params: params ,observe: 'response'}).pipe(
          map((data => new DepositoModule().deserialize(data))
          )
        )
}
  addDeposito(form: FormData){
      return this.http.post(`http://localhost:3000/addDeposito/`,form);

    }
}
