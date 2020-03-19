import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanelBeneficiarioServiceService {
  public isVisible : boolean =false;

  constructor() {

   }
   editStatusView(){
    if(this.isVisible){
      this.isVisible=false;
    }else{
      this.isVisible=true;
    }
   }

}