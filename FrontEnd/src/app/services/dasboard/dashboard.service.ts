import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    return this.http.post(`http://localhost:3000/upploadInfo`, data);
  }
  getDashboard(id_deposito) {
    console.log('get_dasboard');
    const options = {responseType: 'text'};
    const params = new HttpParams()
    .set('id_deposito', id_deposito.toString());
      return this.http.get(`http://localhost:3000/getDashboard/`,
      {params: params,
        responseType : 'blob',
        headers:new HttpHeaders().append('Content-Type','application/json')});

}
downLoadFile(data: any, type: string) {
  let blob = new Blob([data], { type: type});
  let url = window.URL.createObjectURL(blob);
  let pwa = window.open(url);
  if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert( 'Please disable your Pop-up blocker and try again.');

    return blob;
    }
}

}