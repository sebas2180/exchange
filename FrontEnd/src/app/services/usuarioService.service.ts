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
  panelPrincipal:boolean =false;//sirve para
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
    return this.http.post(`${this.authService.ruta}login`, usuario);
  }
  logOut() {
    return this.http.get(`${this.authService.ruta}logout`);
  }
  getUsuario(id:string): Observable<UsuarioModule> {
    console.log(id);
    const params = new HttpParams()
      .set('id',id.toString());
      return this.http.get<string>(`${this.authService.ruta}getUsuario/`,
      {params: params , observe: 'response'})
          .pipe(
          map((data => new UsuarioModule().deserialize(data))
        )
      )
}
getUserForEmail(email: string) {
  const params = new HttpParams()
    .set('email',email.toString());
    return this.http.get<string>(`${this.authService.ruta}getUserForEmail/`,
    {params: params, observe: 'response'});
}
getUserForUser(usuario: string) {
  const params = new HttpParams()
    .set('usuario',usuario.toString());
    return this.http.get<string>(`${this.authService.ruta}getUserForUser/`,
    {params: params, observe: 'response'});
}
getAllUsers(): Observable<UsuarioModule> {

    return this.http.get<string>(`${this.authService.ruta}getAllUsers/`)
        .pipe(
        map((data => new UsuarioModule().deserialize(data))
      )
    )
}
usuarioVerificado(id)  {
  const params = new HttpParams()
  .set('id',id.toString());
  return this.http.get<string>(`${this.authService.ruta}usuarioVerificado/`,
  {params: params, observe: 'response'});
}

getRol(){
  this.canActivate();
  const data = JSON.parse(this.authService.getUserId());
   
  const params = new HttpParams()
  .set('id_user',data);
  return this.http.get(`${this.authService.ruta}getRol`,
  {params: params,observe: 'response'});
}
addUsuario(form: FormData){
  return this.http.put<string>(`${this.authService.ruta}signup`,form);
}
updateUsuario(form: FormData){
  return this.http.post<string>(`${this.authService.ruta}updateUsuario`,form);
}
disabledUsuario(usuario){
  const params = new HttpParams()
  .set('usuario',usuario);
  return this.http.get<string>(`${this.authService.ruta}disabledUsuario`,
  {params: params, observe: 'response'});
}d
validarPassword(password,usuario){
  const params = new HttpParams()
  .set('password',password)
  .set('usuario',usuario);
  return this.http.get<string>(`${this.authService.ruta}validarPassword/`,
  {params: params, observe: 'response'});
}
isCliente(){
  this.getRol().subscribe(
    res=>{
      const aux = res['body'];
      const rol_usuario = aux['rol'];
      console.log('roool:         '+rol_usuario);
      if(rol_usuario == 'cliente'){
        return true;
      }else{
       this.route.navigate(['/panelAdministrador']);
      }
    }
  );
}
isAdministrador(){
  this.getRol().subscribe(
    res=>{

      const aux = res['body'];
      const rol_usuario = aux['rol'];
      console.log(rol_usuario);
      if(rol_usuario=='administrador'){
        return true;
      }else{
        this.route.navigate(['/panel-usuario']);
      }
    }
  );
}
}
