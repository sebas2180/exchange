import { AuthserviceService } from '../../services/authservice.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { DashboardModule } from 'src/app/models/dashboard/dashboard.module';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  isMostrarDash:number=-1;

  HttpUploadOptions = {     
     headers: new HttpHeaders({ Accept: 'application/json' })
};

  constructor(private http: HttpClient, private AuthService : AuthserviceService) { }

  uppload(data: FormData) {
 
    return this.http.post(`${this.AuthService.ruta}prueba`, data,this.HttpUploadOptions);
  }
  upploadInfo(data: FormData) {
    return this.http.post<string> (`${this.AuthService.ruta}upploadInfo`, data);
  }
  getDashboard(id_deposito) {
    console.log('get_dasboard');
     
    const params = new HttpParams()
    .set('id_deposito', id_deposito.toString());
    let headers = new HttpHeaders({
      'Content-Type': 'ResponseContentType.Blob'
   });
      return this.http.get<Blob>(`${this.AuthService.ruta}getDashboard`,
      {params: params,headers:headers});

}

}