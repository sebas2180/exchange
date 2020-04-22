import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  constructor(private http: HttpClient) { }

  getBancos(){
    return this.http.get<string>(`http://localhost:3000/getBancos/`);
}
}
