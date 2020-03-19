import { Router } from '@angular/router';

import { DepositoService } from 'src/app/services/deposito/deposito.service';
import { DepositoModule } from 'src/app/models/deposito/deposito.module';
import { TasasService } from './../../app/services/tasas/tasas.service';
import { UsuarioModule } from './../../app/models/usuario/usuario.module';
import { UsuarioService } from './../../app/services/usuarioService.service';
import { BeneficiarioModule } from 'src/app/models/beneficiario/beneficiario.module';
import { AuthserviceService } from './../../app/services/authservice.service';
import { BeneficiarioService } from './../../app/services/beneficiario/beneficiario.service';
import { Component, OnInit, SimpleChanges,OnChanges } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import {FormBuilder} from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { trigger, style, state, transition, animate } from '@angular/animations';

import swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-transferencia',
  templateUrl: './nueva-transferencia.component.html',
  styleUrls: ['./nueva-transferencia.component.scss'],
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
    ])]
})
export class NuevaTransferenciaComponent implements OnInit {

  beneficiariosAux: BeneficiarioModule[];
  banco: string;
  saldo = 0;
  importe=0;
  data = JSON.parse(this.authService.getLocal());
  pipe = new DatePipe('en-US');
  fechaDeHoy= Date.now();
  usuario: UsuarioModule;
  depo : DepositoModule;
  fechaConvertida  = this.pipe.transform(this.fechaDeHoy,'yyy-MM-dd');
  form: FormGroup;
  isForm:boolean=false;
  fechaCreate_at = this.pipe.transform(this.fechaDeHoy,'yyy-MM-dd hh:mm:ss');
  id_destinatario;
  deposito_guardado:boolean =false;

  newForm(){
    this.isForm=true;
    this.form = new FormGroup({
      id_user: new FormControl(this.data['id'],[Validators.required]),
      fecha: new FormControl(this.fechaConvertida,[Validators.required]),
      monto: new FormControl('',[Validators.required,Validators.min(1)]),
      destinatario: new FormControl('',[Validators.required]),
      monto_transaccion: new FormControl(this.importe),
      pais: new FormControl('',[Validators.required]),
      tasa_actual: new FormControl('',[Validators.required]),
      create_at: new FormControl(this.fechaCreate_at,[Validators.required])
     });
  }
  
  constructor(
        private authService : AuthserviceService,
        public BeneficiarioService : BeneficiarioService,
        public UsuarioService: UsuarioService,
        public TasasService: TasasService,
        private DepositoService: DepositoService,
        private router: Router
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
                    this.form.patchValue({ pais:this.UsuarioService.usuario.pais});

                    this.BeneficiarioService.getBeneficiarios(this.data['id']).subscribe(
                      res=>{
                        this.beneficiariosAux = res['body'];
                        this.BeneficiarioService.beneficiarios= this.beneficiariosAux['beneficiario'];
                      }
                    );
                    this.TasasService.getTasa(this.UsuarioService.usuario.pais).subscribe(
                      res=>{this.TasasService.setTasa(res);
                        this.form.patchValue({ tasa_actual: this.TasasService.Tasa.tasa_actual });
                      },
                      err=>{console.log('Error en traer tasa actual');}
                    );
                  },
                  err =>{
                    console.log(err)
                  }
                );
  }
  ngOnInit(): void {
    this.newForm();
  }
  enviar(){
    const dataForm = new FormData();
    dataForm.append('pais', this.form.get('pais').value);
    dataForm.append('id_user', this.form.get('id_user').value);
    dataForm.append('monto', this.form.get('monto').value);
    dataForm.append('tasa', this.form.get('tasa_actual').value);
    dataForm.append('fecha', this.form.get('fecha').value);
    dataForm.append('id_destinatario', this.id_destinatario);
    dataForm.append('status', 'EN VERIFICACION');
    dataForm.append('create_at',  this.form.get('create_at').value);
    this.DepositoService.addDeposito(dataForm).subscribe(
      res=>{
        const aux = res;
        console.log(aux['id_deposito']);
        swal.fire({
          title:'Guardado exitoso',
          text: 'Ahora ya puedes hacer transferencias a este usuario',
          icon: 'success',
          showConfirmButton: true
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/']);
            } 
        });
        this.deposito_guardado=true;
       this.form.reset();
       },
       err=>{
        console.log('error al enviar el formulario');
       }
    );
  }
  onResetForm(){
    this.form.reset();
  }
  beneficiarioSeleccion(id_beneficiario){
    this.form.patchValue({destinatario: id_beneficiario});
    this.id_destinatario=id_beneficiario;
  }
  calcularMonto(){
    this.importe = this.form.get('monto').value * this.TasasService.Tasa.tasa_actual;
    this.form.patchValue({ monto_transaccion:this.importe});
  }
}
