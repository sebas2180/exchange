 
import { BarraSuperiorService } from './../../app/services/barra-superior/barra-superior.service';
import { AuthserviceService } from './../../app/services/authservice.service';
import { UsuarioService } from './../../app/services/usuarioService.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.scss']
})
export class BarraSuperiorComponent implements OnInit {

  constructor(
    public service: UsuarioService, public auth: AuthserviceService,
    private barraServ:BarraSuperiorService  ) { }
  @Input() titulo: string =' ';
  @Input() exit: boolean =true;
  @Input() volver_atras: boolean =true;
  @Output()   verUsuario : EventEmitter<boolean>= new EventEmitter;
  logeado ;
  ngOnInit( ) {
    this.logeado = this.service.logeado;
   // this.titulo= this.barraService.titulo;
  }
  salir() {

    this.service.logOut().subscribe(
      res => { 
 
        this.barraServ.volver=true;
        this.auth.clearLocalStorage();
        console.log(res);
        this.service.canActivate();
        this.logeado = false;
        this.service.logeado =  this.logeado;
        console.log('this.service.logeado     :'+this.service.logeado);
       // this.toggleNavbar();

      },
      err => {

      });
  }
  edit(){
    this.verUsuario.emit(false);
    
  }
 volver(){
  this.exit=false;
  this.verUsuario.emit(true);
   
 }

}
