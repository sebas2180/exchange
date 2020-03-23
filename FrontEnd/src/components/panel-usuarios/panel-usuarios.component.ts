import { trigger, state, style, transition, animate } from '@angular/animations';
import { UsuarioModule } from './../../app/models/usuario/usuario.module';
import { Component, OnInit, Output } from '@angular/core';

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

  isLodeader: boolean = true;
  isPrincipal:boolean = true;
  usuario: UsuarioModule ;
  constructor() { }

  ngOnInit(): void {
  }
  updateLoader(isLoader){

    this.isLodeader=isLoader;

  }

  verUsuario(usuario){
    this.usuario=usuario;
    if(this.isPrincipal){
      this.isPrincipal=false;
    }else{
      this.isPrincipal=true;
    }

    
  }
}
