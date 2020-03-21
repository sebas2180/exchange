import { AuthserviceService } from './../../app/services/authservice.service';
import { DepositoService } from 'src/app/services/deposito/deposito.service';
import { UsuarioService } from './../../app/services/usuarioService.service';
import { UsuarioModule } from '../../app/models/usuario/usuario.module';
import { Component, OnInit } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { trigger, style, state, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
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
    ]),
    trigger('enterStateRight',[
      state('void',style({
        transform:'translateX(200%)',
        opacity:0
      })),
      transition(':enter',[
        animate('0.5s',style({
          transform:'translateX(0)',
        opacity:1
        }))
      ])
    ]),
    trigger('enterStateBotton',[
      state('void',style({
        transform:'translateY(200%)',
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
export class UsuarioComponent implements OnInit {

  cantidad_depositos : number;
  usuario: UsuarioModule;
  constructor(private authService: AuthserviceService, private depService : DepositoService,private service: UsuarioService) { 
    this.service.canActivate();
    this.service.isCliente();
  }

  ngOnInit() {
    this.usuario = {
      usuario: 'Sebastian',
      password:'****',
      saldo:12000,
      pais:'Argentina',
      id:0    }
    this.cantidad_depositos=0;
    const data = JSON.parse(this.authService.getLocal());
    this.service.getUsuario(data['id']).subscribe(
      res=>{
        console.log(res);
        const aux = res['body'];
        const aux1= aux['usuario'];
        this.usuario =aux1[0] ;
      }
    )
    this.depService.getEstadisticasDelUsuario(data['id']).subscribe(
      res => {
        const a =JSON.parse(res['body']);
       
          this.cantidad_depositos= (a[0].cantidad);

        
      },
      err => {
        console.log(err);
      }
    )
  
  }

}
