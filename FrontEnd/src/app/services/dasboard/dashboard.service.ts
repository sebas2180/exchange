import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  uppload(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<any>(`http://localhost:3000/prueba`, formData,
    {reportProgress: true,observe: 'events'});
  }
}
