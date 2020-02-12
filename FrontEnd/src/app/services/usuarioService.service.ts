import { HttpClient } from '@angular/common/http';
import { UsuarioModule } from '../models/usuario/usuario.module';
import { Injectable } from '@angular/core';
import { AuthserviceService } from './authservice.service';
import { CanActivate,Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements CanActivate {
  desconectado: boolean= false;
  public logeado: boolean= false;
  
  constructor(private http: HttpClient,private authService : AuthserviceService, private route : Router) { }

  canActivate(){
    if(this.authService.isAuthenticatede()){
      console.log('canActivate:  '+ this.authService.isAuthenticatede());
      return true;
    }
    this.route.navigate(['login']);
    return false;
  }
  login(usuario: UsuarioModule) {
    return this.http.post(`http://localhost:3000/login`, usuario);
  }
  logOut() {
    return this.http.get(`http://localhost:3000/logout`);
  }
  
}
