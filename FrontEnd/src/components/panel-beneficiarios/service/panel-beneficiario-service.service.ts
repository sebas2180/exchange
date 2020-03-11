import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanelBeneficiarioServiceService {
  mostrarAlerta : boolean =false;
  mostrarAlertaEliminado: boolean = false;
  constructor() {
    

   }
   cerrarAlerta(){
     this.mostrarAlertaEliminado=false;
   }
}
