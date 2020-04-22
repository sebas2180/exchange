import { AuthserviceService } from '../../services/authservice.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../../../../crypto-info/frontend/src/services/authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  constructor(private http: HttpClient,private AuthService: AuthService) { }

  getBancos(){
    return this.http.get<string>(`${this.AuthService.ruta}getBancos`);
}
}
