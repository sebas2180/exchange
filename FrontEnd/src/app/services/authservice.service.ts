
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  //public ruta :string  = `http://localhost:2100/`;
  public ruta :string  = `http://161.35.134.242:2100/`;

  public clearLocalStorage(){
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userId');
    localStorage.removeItem('access-token');
    this.getLocal();
  }
  public getLocal(){
    return localStorage.getItem('userInfo');
  }
   public getUserId(){
    return localStorage.getItem('userId');
  }

  public getToken(){
    return localStorage.getItem('access-token');
  }
  
  public isAuthenticatede() : Boolean {
    let userData = localStorage.getItem('userInfo');
    if(localStorage.getItem('userId') != 'undefined' && localStorage.getItem('access-token')){
      return true;
    }
     else{
      this.clearLocalStorage();
      return false;
    }
    
    return false;
  }
  public setUserInfo(userId ,userName, token){
    localStorage.setItem('userInfo', JSON.stringify(userName));
    localStorage.setItem('userId',JSON.stringify(userId));
    localStorage.setItem('access-token', JSON.stringify(token));

  }

  constructor(private http: HttpClient) { }
}
