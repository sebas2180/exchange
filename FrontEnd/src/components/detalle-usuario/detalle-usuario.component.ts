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
  @Output() emitChange  =  new EventEmitter();
  input: string;
  constructor(private UsuarioServ: UsuarioService,
    private router: Router) { }
  paises: string[] = [ 'ARGENTINA','BRASIL','CHILE','URUGUAY','PARAGUAY','ESPAÑA'];
  form : FormGroup;
  active:boolean =false;
  ngOnInit(): void {
    this.newForm();
    
  }
  newForm(){

    this.form= new FormGroup({
      usuario: new FormControl(this.usuario.usuario,[Validators.required]),
      pais: new FormControl(this.usuario.pais,[Validators.required]),
      email: new FormControl(this.usuario.email,[Validators.required]),
      password: new FormControl(this.usuario.password,[Validators.required]),
      create_at: new FormControl(this.usuario.create_at),
      nombre: new FormControl(this.usuario.nombre),
      apellido: new FormControl(this.usuario.apellido),
      saldo: new FormControl(this.usuario.saldo),
      status: new FormControl(this.usuario.status),
      telefono: new FormControl(this.usuario.telefono)
    });
    status = this.form.get('status').value;
    console.log(status);
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
    this.emitChange.emit(true);
  }
  guardar(){
    const dataForm = new FormData();
    dataForm.append('usuario',this.form.get('usuario').value);
    dataForm.append('pais',this.form.get('pais').value);
    dataForm.append('email',this.form.get('email').value);
    dataForm.append('nombre',this.form.get('nombre').value);
    dataForm.append('apellido',this.form.get('apellido').value);
    dataForm.append('telefono',this.form.get('telefono').value);
    
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
              this.router.navigate(['/panelAdmUsuarios']);
            }
          )
        }
      },error=>{
        Swal.fire({
          icon: 'error',
          timer: 1500,
          title: 'Error al actualizar'
        }).then(
          r=>{
            this.router.navigate(['/panelAdmUsuarios']);
          }
        )
       
      }
    )
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
