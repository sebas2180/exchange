import { Router } from '@angular/router';
import { UsuarioService } from './../../app/services/usuarioService.service';
import { UsuarioModule } from './../../app/models/usuario/usuario.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';



@Component({
  selector: 'detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss']
})
export class DetalleUsuarioComponent implements OnInit {
  @Input() usuario: UsuarioModule;
  @Input() esAdministrador: boolean;
  @Input() esVerificar: boolean;
  @Output() emitChange  =  new EventEmitter();
  input: string;
  constructor(public UsuarioServ: UsuarioService,
    private router: Router) { }
  paises: string[] = ['','ARGENTINA','BRASIL','CHILE','URUGUAY','PARAGUAY','ESPAÑA'];
  tipos_de_documento: string[]=['','CED','RIF'];
  form : FormGroup;
  active:boolean =false;
  ready_tipo_documento:boolean=false;
  ngOnInit(): void {
    this.newForm();
    
  }
  newForm(){
   // console.log(this.usuario);
  //  console.log('telefono:    :');
 //   console.log(this.usuario.telefono);
    this.form= new FormGroup({
      usuario: new FormControl(this.usuario.usuario,[Validators.required]),
      pais: new FormControl('',[Validators.required]),
      email: new FormControl(this.usuario.email,[Validators.required]),
      password: new FormControl(this.usuario.password,[Validators.required]),
      create_at: new FormControl(this.usuario.create_at),
      nombre: new FormControl(this.usuario.nombre,[Validators.required]),
      apellido: new FormControl(this.usuario.apellido,[Validators.required]),
      saldo: new FormControl(this.usuario.saldo),
      status: new FormControl(this.usuario.status),
      telefono: new FormControl('',[Validators.required]),
      tipo_documento: new FormControl('',[Validators.required]),
      nro_documento: new FormControl('',[Validators.required,Validators.max(99999999),Validators.min(10000000)]),
    });
    status = this.form.get('status').value;
 
    if(this.usuario.nro_documento !=null){
      this.form.patchValue({ nro_documento: this.usuario.nro_documento});
    }
    if(this.usuario.tipo_documento !=null && this.usuario.tipo_documento !=''){
      this.form.patchValue({ tipo_documento: this.usuario.tipo_documento});
      this.tipos_de_documento= [this.usuario.tipo_documento];
    }
    if(this.usuario.pais !=null && !this.esAdministrador){
      this.form.patchValue({ pais: this.usuario.pais});
      this.paises= [this.usuario.pais];
    }
    if(this.usuario.telefono){
      this.form.patchValue({ telefono: this.usuario.telefono});
    }

  // console.log(status);
    if(status =='inactivo'){
      this.form.disable();
      this.active=false;
    }else{
      this.form.enable();
      this.active=true;
    }
  }

  Inabilitar(){
    Swal.fire({
    input: 'password',
    title: 'Para borrar el usuario, ingrese \''+this.form.get('usuario').value+'\' y confirme',
      inputValue: '',
      showCancelButton: true
    })
   .then(
     res=>{
      if(res.value ==this.form.get('usuario').value){
       this.UsuarioServ.disabledUsuario(this.form.get('usuario').value).subscribe(
         res=>{
           const aux = res['body'];
           if(aux['status'] == 720){
            Swal.fire({
              icon: 'success',
              title: aux['msj'],
            })
            this.usuario.status='inactive';
            this.form.disable();
            this.active=false;
           }else{
            Swal.fire({
              icon: 'error',
              title: aux['msj'],
            })
           }
           this.active=false;
         },
         err=>{
           console.log(err);
         }
       )
      }
     }
   )

  }
  back(){
   if(this.esVerificar){
    this.router.navigate(['/transferencias']);
   }else{
    this.emitChange.emit(true);
   }
  }
  guardar(){
    if(!this.form.invalid){
      this.usuario.nombre=this.form.get('nombre').value;
      this.usuario.pais=this.form.get('pais').value;
      this.usuario.email=this.form.get('email').value;
      this.usuario.apellido=this.form.get('apellido').value;
      this.usuario.telefono=this.form.get('telefono').value;
      this.usuario.tipo_documento=this.form.get('tipo_documento').value;
      this.usuario.nro_documento=this.form.get('nro_documento').value;
     
      const dataForm = new FormData();
      dataForm.append('nombre',this.form.get('nombre').value);
      dataForm.append('apellido',this.form.get('apellido').value);
      dataForm.append('tipo_documento',this.form.get('tipo_documento').value);
      dataForm.append('nro_documento',this.form.get('nro_documento').value);
      dataForm.append('telefono',this.form.get('telefono').value);
      dataForm.append('email',this.form.get('email').value);
      dataForm.append('usuario',this.form.get('usuario').value);
      dataForm.append('pais',this.form.get('pais').value);

      this.UsuarioServ.updateUsuario(dataForm).subscribe(
        res=>{
          if(res['status']==724){
            Swal.fire({
              icon: 'success',
              timer: 1500,
              title: res['msj']
            }).then(
              r=>{
                this.emitChange.emit(true);
              })
          }else{
            Swal.fire({
              icon: 'error',
              timer: 1500,
              title: res['msj']
            }).then(
              r=>{
                this.router.navigate(['/comprobar']);
              }
            )
          }
        },error=>{
          Swal.fire({
            icon: 'error',
            timer: 1500,
            title: 'Error al actualizar',
            
          }).then(
            r=>{
              this.router.navigate(['/comprobar']);
            }
          )
        }
      )
    }
  }
  editar(){
    var pass1;
    var pass2;
    Swal.fire({
      input: 'password',
      title: 'Su contraseña actual',
        inputValue: '',
        showCancelButton: true
      })
     .then(
       res=>{
         this.UsuarioServ.validarPassword(res.value,this.usuario.usuario).subscribe(
           res1=>{
             const aux1= (res1['body']);
              
             if(aux1['status']==722){
              Swal.fire({
                input: 'password',
                title: 'Ingrese una nueva contraseña',
                  inputValue: '',
                  showCancelButton: true
                })
               .then(
                 res2=>{
                    pass1=res2.value;
                    Swal.fire({
                      input: 'password',
                      title: 'Repita la nueva contraseña',
                        inputValue: '',
                        showCancelButton: true
                      })
                     .then(
                       res3=>{
                          pass2=res3.value;
                          if(pass1==pass2){
                            Swal.fire({
                              icon: 'success',
                              title: 'Modificacion correcta',
                            })
                          }else{
                            Swal.fire({
                              icon: 'error',
                              title: 'Ops, no coinciden las nuevas contraseñas',
                            })
                          }
                       }
                     )
                 }
               )
             }else{
              Swal.fire({
                icon: 'error',
                title: 'Contraseña incorrecta',
              })
             }
           }
         )
       }
     )
  }

}

