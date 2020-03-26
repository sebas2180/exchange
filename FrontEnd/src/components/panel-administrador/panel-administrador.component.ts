import { DashboardService } from './../../app/services/dasboard/dashboard.service';
import { BeneficiarioModule } from './../../app/models/beneficiario/beneficiario.module';
import { TasasService } from './../../app/services/tasas/tasas.service';

import { ManejoFechasService } from './../../../shared/services/manejoFechasService/manejo-fechas.service';
import { TasaModule } from 'src/app/models/tasa/tasa.module';

import { UsuarioService } from './../../app/services/usuarioService.service';
import { DepositosComponent } from './../depositos/depositos.component';

import { AuthserviceService } from 'src/app/services/authservice.service';
import { DepositoService } from 'src/app/services/deposito/deposito.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'panel-administrador',
  templateUrl: './panel-administrador.component.html',
  styleUrls: ['./panel-administrador.component.scss']
})
export class PanelAdministradorComponent implements OnInit {
  
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort,{ static: true }) sort: MatSort;
@ViewChild('depositos') tablaDepositos:DepositosComponent;


// displayedColumns: string[] = ['id','pais','fecha','monto','status'];
  transacciones:number =100;
  confirmadas:number =40;
  verificacion:number =60;
  ViewBox1:boolean =true;
  ViewBox2:boolean =true;
  ViewBox3:boolean =true;
  ViewBox4:boolean =true;
  viewPrincipal:boolean =true;
  isMostrarDash: number =-1;
  beneficiarioDash: BeneficiarioModule;
  constructor(private TransaccionService: DepositoService,
    private ManejoFechasService: ManejoFechasService,
    private authService : AuthserviceService,
    private UsuarioService: UsuarioService,
    private TasasService:TasasService,
    private DashboardService: DashboardService,
    private router: Router) {
      this.UsuarioService.canActivate();
      this.UsuarioService.isAdministrador();

   }

  ngOnInit(): void {
  }
  close(index){
    if(index==1) {     this.ViewBox1=false;    }
    if(index==2) {     this.ViewBox2=false;    }
    if(index==3) {     this.ViewBox3=false;    }
    if(index==4) {     this.ViewBox4=false;    }
  }
  open(index){
    if(index==1) {     this.ViewBox1=true;    }
    if(index==2) {     this.ViewBox2=true;    }
    if(index==3) {     this.ViewBox3=true;    }
    if(index==4) {     this.ViewBox4=true;    }
  }
  setIsMostrarDash(e){
    this.isMostrarDash=e;
    // this.DashboardService.isMostrarDash=e;
    // this.router.navigate['/nuevoDashboard'];
  }
  updateTasa(e){
    console.log(e);
  Swal.fire({
    title: 'Ingrese tasa de: '+e,
    input: 'number',
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'Ingresar un monto!!'
      }
    }
  }).then(
    res=>{
      const dataForm = new FormData();
      const TasaMo = new TasaModule();
      const date = new Date();
      TasaMo.createAt=date;
      TasaMo.tasa_actual=res.value;  
      TasaMo.nombre=   e;
      dataForm.append('create_at',this.ManejoFechasService.convertDateToCreateAt(TasaMo.createAt));
      dataForm.append('tasa_actual',TasaMo.tasa_actual.toString());
      dataForm.append('pais',TasaMo.nombre);
      console.log(dataForm);
      this.TasasService.updateTasa(TasaMo).subscribe(
        res=>{
          Swal.fire({
            icon: 'success',
            title: 'Actualizacion correcta' ,
            showConfirmButton: false,
            timer: 1500
          })
        },
        err=>{
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar tasa  ' ,
            showConfirmButton: false,
            timer: 1500
          })
        }
      )
    },
    err=>{

    }
  )

  }
}
