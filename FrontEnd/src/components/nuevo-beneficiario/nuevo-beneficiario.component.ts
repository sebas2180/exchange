import { ManejoFechasService } from './../../../shared/services/manejoFechasService/manejo-fechas.service';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { BeneficiarioService } from './../../app/services/beneficiario/beneficiario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { trigger, style, state, transition, animate } from '@angular/animations';
import swal  from 'sweetalert2';

@Component({
  selector: 'app-nuevo-beneficiario',
  templateUrl: './nuevo-beneficiario.component.html',
  styleUrls: ['./nuevo-beneficiario.component.scss'],
  animations:[
    trigger('enterState',[
      state('void',style({
        transform:'translateX(-50%)',
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
export class NuevoBeneficiarioComponent implements OnInit {
  panelActual=1;
  avanzar=false;
  id_banco: number;
  bancos =[{id_banco:1,banco:'Santander'},
            {id_banco:2,banco:'Galicia'},
            {id_banco:3,banco:'Macro'}];
  form: FormGroup;
  dataUsuarioLocal = JSON.parse(this.authService.getLocal());
   unamePattern = "[a-zA-Z ]*";
  constructor(private router : Router,
              private beneficiarioService: BeneficiarioService,
              private authService: AuthserviceService,
              private ManejoFechasService: ManejoFechasService
              ) { }

  ngOnInit(): void {
    this.newForm();
  }

  nextPanel(){

    if(this.panelActual == 4){
      if(this.form.controls.nro_cuenta.invalid || this.form.controls.tipo_cuenta.invalid){
        swal.fire({
          icon: 'error',
          title: 'Falta completar datos cuenta' ,
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        this.panelActual++;
      }  
  }


  if(this.panelActual == 3){
    if(this.form.controls.id_banco.invalid ){
      swal.fire({
        icon: 'error',
        title: 'Falta completar datos banco' ,
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      this.panelActual++;
    }  
}

if(this.panelActual == 2){
  // console.log(this.form.controls.nro_documento.invalid );
  // console.log(this.form.controls.tipo_documento.invalid );
  if(this.form.controls.nro_documento.invalid || this.form.controls.tipo_documento.invalid){
    swal.fire({
      icon: 'error',
      title: 'Falta completar datos documento' ,
      showConfirmButton: false,
      timer: 1500
    })
  }else{
    this.panelActual++;
  }  
}
 
if(this.panelActual == 1){
  if(this.form.controls.nombre.invalid || this.form.controls.apellido.invalid){
    swal.fire({
      icon: 'error',
      title: 'Falta completar datos1' ,
      showConfirmButton: false,
      timer: 1500
    })
  }else{
    this.panelActual++;
  } 
}

  }
  newForm(){
    
    this.form= new FormGroup({
      nombre: new FormControl('',[Validators.required,Validators.minLength(2),Validators.pattern(this.unamePattern)]),
      apellido: new FormControl('',[Validators.required]),
      id_banco: new FormControl('',[Validators.required]),
      tipo_documento: new FormControl('',[Validators.required]),
      nro_documento: new FormControl('',[Validators.required]),
      tipo_cuenta: new FormControl('',[Validators.required]),
      nro_cuenta: new FormControl('',[Validators.required]),
      id_user: new FormControl('',[Validators.required]),
      create_at: new FormControl(this.ManejoFechasService.createDateCreateAt(),[Validators.required])
    });
    this.form.patchValue({ id_user: this.dataUsuarioLocal['id'] });
  }
  beforePanel(){
  
    this.panelActual--;
  }

  guardar(){
    this.panelActual=5;
    const dataForm= new FormData();
    console.log('id usuario:'+this.form.get('id_user').value);
    dataForm.append('nombre',this.form.get('nombre').value);
    dataForm.append('apellido',this.form.get('apellido').value);
    dataForm.append('banco',this.id_banco.toString());
    dataForm.append('tipo_documento',this.form.get('tipo_documento').value);
    dataForm.append('nro_documento',this.form.get('nro_documento').value);
    dataForm.append('tipo_cuenta',this.form.get('tipo_cuenta').value);
    dataForm.append('nro_cuenta',this.form.get('nro_cuenta').value);
    dataForm.append('id_usuario',this.form.get('id_user').value);
    dataForm.append('create_at',this.form.get('create_at').value);
    this.beneficiarioService.addBeneficiario(dataForm).subscribe(
      res=>{
        console.log(res);
        swal.fire({
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 2200
        }).then(
          res=> {
            this.router.navigate(['/PanelBeneficiarios']);
        })
      },
      err=>{
        swal.fire({
          icon: 'error',
          title: 'Error al guardar el beneficiario, intentalo luego',
          showConfirmButton: false,
          showCancelButton: true
        }).then(
          res=> {
            this.router.navigate(['/PanelBeneficiarios']);
        })
        console.log(err);
      }
    );

  }
  changeBanco(id_banco){
    this.form.patchValue({id_banco: id_banco});
    this.id_banco=id_banco;
  
  
  }
  volver(){
    this.router.navigate(['/']);
  }
}
