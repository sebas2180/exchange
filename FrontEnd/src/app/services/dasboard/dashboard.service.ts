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

  constructor(private http: HttpClient) { }

  uppload(data: FormData) {
 
    return this.http.post(`http://localhost:3000/prueba`, data,this.HttpUploadOptions);
  }
  upploadInfo(data: FormData) {
    return this.http.post<string> (`http://localhost:3000/upploadInfo`, data);
  }
  getDashboard(id_deposito) {
    console.log('get_dasboard');
     
    const params = new HttpParams()
    .set('id_deposito', id_deposito.toString());
    let headers = new HttpHeaders({
      'Content-Type': 'ResponseContentType.Blob'
   });
      return this.http.get<Blob>(`http://localhost:3000/getDashboard/`,
      {params: params,headers:headers});

}

}