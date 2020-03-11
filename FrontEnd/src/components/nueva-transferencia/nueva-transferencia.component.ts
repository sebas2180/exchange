 import { TasasService } from './../../app/services/tasas/tasas.service';
import { UsuarioModule } from './../../app/models/usuario/usuario.module';
import { UsuarioService } from './../../app/services/usuarioService.service';
import { BeneficiarioModule } from 'src/app/models/beneficiario/beneficiario.module';
import { AuthserviceService } from './../../app/services/authservice.service';
import { BeneficiarioService } from './../../app/services/beneficiario/beneficiario.service';
import { Component, OnInit, SimpleChanges,OnChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import {FormBuilder} from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-nueva-transferencia',
  templateUrl: './nueva-transferencia.component.html',
  styleUrls: ['./nueva-transferencia.component.scss']
})
export class NuevaTransferenciaComponent implements OnInit {
   beneficiariosAux: BeneficiarioModule[];
  banco: string;
   saldo = 0;
   tasa=1.233;
  importe=0;
  data = JSON.parse(this.authService.getLocal());
   pipe = new DatePipe('en-US');
  fechaDeHoy= Date.now();
   usuario: UsuarioModule;
  fechaConvertida  = this.pipe.transform(this.fechaDeHoy,'dd/MM/yyyy');
  form = new FormGroup({
    id_user: new FormControl(this.data['id']),
    fecha: new FormControl(this.fechaConvertida),
    monto: new FormControl('',[Validators.required,Validators.min(1)]),
    destinatario: new FormControl('',[Validators.required]),
    monto_transaccion: new FormControl(this.importe)
   });

  constructor(
        private authService : AuthserviceService,public BeneficiarioService : BeneficiarioService,
              public UsuarioService: UsuarioService, public TasasService: TasasService
              ) {
                const id= this.data['id'];
                this.UsuarioService.getUsuario(id).subscribe(
                  res=>{
                    const aux  = res['body'];
                    const aux2= aux['usuario'];
                    const aux3= aux2[0]; 
                    this.usuario=aux2[0];
                    this.UsuarioService.usuario=this.usuario;
                    console.log( this.UsuarioService.usuario.pais);

                    this.BeneficiarioService.getBeneficiarios(this.data['id']).subscribe(
                      res=>{
                        this.beneficiariosAux = res['body'];
                        this.BeneficiarioService.beneficiarios= this.beneficiariosAux['beneficiario'];
                        // console.log(this.data['usuario']);
                      }
                    );

                    this.TasasService.getTasa(this.UsuarioService.usuario.pais).subscribe(
                      res=>{
                        this.TasasService.setTasa(res);
                      },
                      err=>{
                        console.log('Error en traer tasa actual');
                      }
                    );
                  },
                  err =>{
                    console.log(err)
                  }
                );
  }
 
  ngOnInit(): void {

  }
  enviar(){
    alert('alerta');
  }
  onResetForm(){
    this.form.reset();
  }
  calcularMonto(){

    this.importe = this.form.get('monto').value * this.tasa;
    this.form.get('monto').valueChanges.subscribe(
      a=>{

        this.form = new FormGroup({
          monto: new FormControl(this.form.get('monto').value,[Validators.required,Validators.min(1)]),
          destinatario: new FormControl(this.form.get('destinatario').value,[Validators.required]),
          monto_transaccion: new FormControl(this.importe)
         });
      }
    )
  }
}
