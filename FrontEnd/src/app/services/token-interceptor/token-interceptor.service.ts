import { AuthserviceService } from 'src/app/services/authservice.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {


  constructor(
              private AuthService: AuthserviceService
            ) { }
  intercept( req, next ) {
    var tokinazeReq;
    if(this.AuthService.getLocal()){
       tokinazeReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.AuthService.getToken()} ${this.AuthService.getLocal()}`
        }
      });
    }else{
      tokinazeReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.AuthService.getToken()}`
        }
      });
  }
    return next.handle(tokinazeReq);
  }
}

