import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  uppload(data: FormData) {

    return this.http.post(`http://localhost:3000/prueba`, data);
  }
}
