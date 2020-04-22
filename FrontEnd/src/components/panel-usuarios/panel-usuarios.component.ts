import { trigger, state, style, transition, animate } from '@angular/animations';
import { UsuarioModule } from './../../app/models/usuario/usuario.module';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-panel-usuarios',
  templateUrl: './panel-usuarios.component.html',
  styleUrls: ['./panel-usuarios.component.scss'],
  animations:[
    trigger('enterState',[
      state('void',style({
        transform:'translateX(-100%)',
        opacity:0
      })),
      transition(':enter',[
        animate('0.5s',style({
          transform:'translateX(0)',
        opacity:1
        }))
      ])
    ])
  ]
})
export class PanelUsuariosComponent implements OnInit {

  volver_atras=false;
  titulo="PANEL USUARIOS";
  isLodeader: boolean = true;
  isPrincipal:boolean = true;
  usuario: UsuarioModule ;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  updateLoader(isLoader){

    this.isLodeader=isLoader;

  }

  verUsuario(usuario){
    this.usuario=usuario;
    if(this.isPrincipal){
      this.isPrincipal=false;
      this.volver_atras=false;
    }else{
      this.isPrincipal=true;
      this.volver_atras=true;
    }

    
  }
  volver(e){
    if(this.isPrincipal){
      this.router.navigate(['/panelAdministrador']);
    }
     this.isPrincipal=true;
      this.volver_atras=true;
  }
}
