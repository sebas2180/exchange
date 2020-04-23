import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardService {
 
            
          constructor(  private AuthService: AuthserviceService,
                        private Router: Router
                ){

        }
        canActivate() :boolean{
       
        if(this.AuthService.isAuthenticatede()){
        console.log('true');
        return true;
        }else{
        console.log('false');
        this.Router.navigate(['/login']);
        }
        }
   }
