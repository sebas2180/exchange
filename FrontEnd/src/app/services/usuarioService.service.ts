import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  public usuario: UsuarioModule;
  
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
  getUsuario(id: number): Observable<UsuarioModule> {
    const params = new HttpParams()
      .set('id',id.toString());
      return this.http.get<string>(`http://localhost:3000/getUsuario/`,
      {params: params, observe: 'response'})
          .pipe(
          map((data => new UsuarioModule().deserialize(data))
        )
      )
}
}
