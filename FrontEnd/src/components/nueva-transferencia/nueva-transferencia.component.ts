import { BarraSuperiorService } from './../../app/services/barra-superior/barra-superior.service';
import { Router, Event } from '@angular/router';

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

  isUsuarioVerificado:boolean= true;
  beneficiariosAux: BeneficiarioModule[];
  banco: string;
  saldo = 0;
  importe:number=0;
  data = JSON.parse(this.authService.getLocal());
  pipe = new DatePipe('en-US');
  fechaDeHoy= Date.now();
  usuario: UsuarioModule;
  depo : DepositoModule;
  fechaConvertida  = this.pipe.transform(this.fechaDeHoy,'yyy-MM-dd');
  form: FormGroup;
  isForm:boolean=false;
  titulo:string="NUEVA TRANSFERENCIA";
  fechaCreate_at = this.pipe.transform(this.fechaDeHoy,'yyy-MM-dd hh:mm:ss');
  id_destinatario;
  deposito_guardado:boolean =false;
  
  newForm(){
    this.isForm=true;
    this.form = new FormGroup({
      id_user: new FormControl(this.data['id'],[Validators.required]),
      fecha: new FormControl(this.fechaConvertida,[Validators.required]),//Validators.pattern("^[0-9]*$")]
      monto: new FormControl('',[Validators.required,Validators.min(1)]),
      destinatario: new FormControl('',[Validators.required]),
      monto_transaccion: new FormControl(this.importe),
      pais: new FormControl('',[Validators.required]),
      tasa_actual: new FormControl('',[Validators.required]),
      saldo_restante: new FormControl('',[Validators.required,Validators.min(0)]),
      create_at: new FormControl(this.fechaCreate_at,[Validators.required])
     });
  }
  
  constructor(
        private authService : AuthserviceService,
        public BeneficiarioService : BeneficiarioService,
        public UsuarioService: UsuarioService,
        public TasasService: TasasService,
        private DepositoService: DepositoService,
        private router: Router,
        public BarraSuperiorService:BarraSuperiorService
              ) {
                this.BarraSuperiorService.volver=false;
                const data = parseInt( this.authService.getUserId() );
                this.UsuarioService.getUsuario(data.toString()).subscribe(
                  res=>{
                    const aux  = res['body'];
                    const aux2= aux['usuario'];
                    this.usuario=aux2;
                    this.UsuarioService.usuario=this.usuario;
                    this.form.patchValue({ pais:this.UsuarioService.usuario.pais});
                    this.form.patchValue({ tasa_actual:this.UsuarioService.usuario.tasa});
                    this.BeneficiarioService.getBeneficiarios(data).subscribe(
                      res=>{
                        this.beneficiariosAux = res['body'];
                        this.BeneficiarioService.beneficiarios= this.beneficiariosAux['beneficiario'];
                      }
                    );
                    this.UsuarioService.usuarioVerificado(this.usuario.usuario).subscribe(
                      resVerificado=>{
                        
                        var aux = resVerificado['body'];
                        console.log(aux['status']);
                        if(aux['status']==742){
                          this.isUsuarioVerificado=true;
                        }else{
                          this.isUsuarioVerificado=false;
                        }
                      },errVerif=>{
                        console.log(errVerif);
                        this.isUsuarioVerificado=true;
                      }
                    )
                    // if(this.UsuarioService.usuario.isUsuarioConfirmado()){
                    //   this.isUsuarioVerificado=false;
                    // }
                  },
                  err =>{
                    console.log(err)
                  }
                );
  }
  ngOnInit(): void {
    this.BarraSuperiorService.volver=false;
    this.newForm();

    
  }
  actualizarDatos(){
    this.UsuarioService.panelPrincipal=true;
    this.router.navigate(['/verificar-datos'] );

  }
  volver(e){
    this.BarraSuperiorService.volver=true;
    if(this.BarraSuperiorService.ir_menu_beneficiacrios){
      this.router.navigate(['/PanelBeneficiarios']);
    }else{
      this.UsuarioService.panelPrincipal=false;
      this.router.navigate(['/panel-usuario/'],{ queryParams: { verUsuario: 'false'}});
    }
  }
  enviar(){
   // this.calcularMonto();

   if(this.form.invalid){
    swal.fire({
      title:'Verifica los datos',
      text: 'Hay campos invalidos',
      icon: 'error',
      showConfirmButton: true
    })
   }else{
    const dataForm = new FormData();
    dataForm.append('pais', this.form.get('pais').value);
    dataForm.append('id_user', this.form.get('id_user').value);
    dataForm.append('monto', this.form.get('monto').value);
    dataForm.append('monto_transaccion', this.form.get('monto_transaccion').value);
    dataForm.append('tasa', this.form.get('tasa_actual').value);
    dataForm.append('fecha', this.form.get('fecha').value);
    dataForm.append('saldo_restante', this.form.get('saldo_restante').value);
    dataForm.append('viejo_saldo', this.UsuarioService.usuario.saldo.toString());
    dataForm.append('id_destinatario', this.id_destinatario);
    dataForm.append('status', 'EN VERIFICACION');
    dataForm.append('create_at',  this.form.get('create_at').value);
    
   
    this.DepositoService.addDeposito(dataForm).subscribe(
      res=>{
        const aux = res;
       if(aux['status']==738){
        swal.fire({
          title:aux['title'],
          text: aux['text'],
          icon: 'success',
          showConfirmButton: true
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/']);
            } 
        });
       }else{
        swal.fire({
          title:aux['title'],
          text: aux['text'],
          icon: 'error',
          showConfirmButton: true
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/']);
            } 
        });
       }

        this.deposito_guardado=true;
       this.form.reset();
       },
       err=>{
        console.log('error al enviar el formulario');
       }
    );
   }

  }
  onResetForm(){
    this.form.reset();
  }
  beneficiarioSeleccion(id_beneficiario){
    this.form.patchValue({destinatario: id_beneficiario});
    this.id_destinatario=id_beneficiario;
  }
  calcularMonto(){
    var saldo = this.UsuarioService.usuario.saldo;
    var tasa = this.form.get('tasa_actual').value;
    this.importe = this.form.get('monto').value * tasa;
    saldo = saldo-this.importe;
    this.form.patchValue({ monto_transaccion:this.importe});
    this.form.patchValue({ saldo_restante: saldo});
 
  }
}
