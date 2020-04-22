 
import { AuthserviceService } from '../../services/authservice.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BancoService {

  constructor(private http: HttpClient,private AuthService: AuthserviceService) { }

  getBancos(){
    return this.http.get<string>(`${this.AuthService.ruta}getBancos`);
}
}
