import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { AuthserviceService } from './../authservice.service';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DepositoModule } from 'src/app/models/deposito/deposito.module';
import {map, catchError} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class DepositoService  {

  constructor(private http: HttpClient,private authService: AuthserviceService, private route : Router) { 


  }
  CanActivate(){
    if(this.authService.isAuthenticatede()){
      console.log('canActivate:  '+ this.authService.isAuthenticatede());
      return true;
    }
    this.route.navigate(['login']);
    return false;
  }
  a(){
    return 12;
  }

  getAllDepositosForUser(id: number): Observable<DepositoModule>{
      console.log('service consola');
        return this.http.get<DepositoModule[]>(`http://localhost:3000/allDepositsForUser/`,{
          params: {id: '1' },observe: 'response'}).pipe(
            map((data => new DepositoModule().deserialize(data))
            )
          )
  }


  // getAllDepositosForUser(id: number): Observable<any>{
  //   console.log('service consola');
  //     return this.http.get(`http://localhost:3000/allDepositsForUser/`,{
  //       params: {id: '1' },observe: 'response'});
  //     }
}
