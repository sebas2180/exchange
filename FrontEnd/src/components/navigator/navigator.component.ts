import { AuthserviceService } from './../../app/services/authservice.service';
import { UsuarioService } from './../../app/services/usuarioService.service';
import { Component, OnInit } from '@angular/core';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
  animations:[
    trigger('enterStateTop',[
      state('void',style({
        transform:'translateY(-100%)',
        opacity:0
      })),
      transition(':enter',[
        animate('0.5s',style({
          transform:'translateY(0)',
        opacity:1
        }))
      ])
    ])
  ]
})
export class NavigatorComponent implements OnInit {
  logeado ;
  navbarOpen = false;
  constructor(public service: UsuarioService, public auth: AuthserviceService) {

    console.log('this.service.logeado     :'+this.service.logeado);
  }

  ngOnInit( ) {
    this.logeado = this.service.logeado;
  }

  salir() {
    this.service.logOut().subscribe(
      res => { 
        this.auth.clearLocalStorage();
        console.log(res);
        this.service.canActivate();
        this.logeado = false;
        this.service.logeado =  this.logeado;
        console.log('this.service.logeado     :'+this.service.logeado);
        this.toggleNavbar();

      },
      err => {

      });
  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}
