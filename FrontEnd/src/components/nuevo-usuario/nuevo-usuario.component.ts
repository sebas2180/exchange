import { UsuarioService } from './../../app/services/usuarioService.service';
import { AuthserviceService } from './../../app/services/authservice.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal  from 'sweetalert2';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.scss']
})
export class NuevoUsuarioComponent implements OnInit {

  @Input() isAdministrador: boolean = false;
  constructor( private AuthserviceService: AuthserviceService,
                private UsuarioService : UsuarioService) {
    //UsuarioService.isAdministrador();
    UsuarioService.canActivate();


  }
  form: FormGroup;
  panelActual: number=1;

  paises: string[] = [ 'ARGENTINA','BRASIL','CHILE','URUGUAY','PARAGUAY','ESPAÑA'];
  ngOnInit(): void {
    this.newForm();
          var userRamdom=(Math.random())*1000000;
          var userRamdom2='pwd'+(Math.trunc(userRamdom));
          this.form.patchValue({password:userRamdom2});

    this.UsuarioService.getRol().subscribe(
      res=>{
        const aux = res['body'];
        const rol_usuario = aux['rol'];
        if(rol_usuario=='administrador'){
          this.isAdministrador=true; 
          var userRamdom=(Math.random())*100000;
          var userRamdom2='user'+(Math.trunc(userRamdom));
          this.form.patchValue({usuario:userRamdom2});
          console.log(userRamdom2);
          
        }else{
          this.isAdministrador=false;
        }
      }
    )
    }
    beforePanel(){
      this.panelActual--;
    }
    crear_usuario(){
        
    }
    nextPanel(){

      if(this.panelActual == 4){
        if(this.form.controls.password.invalid){
          swal.fire({
            icon: 'error',
            title: 'Falta seleccionar el pais' ,
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          this.panelActual++;
        } 
      }

      if(this.panelActual == 3){
        if(this.form.controls.pais.invalid){
          swal.fire({
            icon: 'error',
            title: 'Falta seleccionar el pais' ,
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          this.panelActual++;
        } 
      }
      if(this.panelActual == 2){
        if(this.form.controls.email.invalid){
          swal.fire({
            icon: 'error',
            title: 'Falta completar el email' ,
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          this.UsuarioService.getUserForEmail(this.form.get('email').value).subscribe(
            res=>{
              const aux= (res['body']);
              if(aux['status']==716){// NO existe usuario con este nick
                swal.fire({
                  icon: 'error',
                  title: 'Email ya registrado en el sistema' ,
                  showConfirmButton: false,
                  timer: 1500
                })
              }
              if(aux['status']==715){//  existe usuario con este nick
                this.panelActual++;
              }
            },
            err=>{
              console.log(err);
            }
          )
        } 
      }
      if(this.panelActual == 1){
        if(this.form.controls.usuario.invalid){
          swal.fire({
            icon: 'error',
            title: 'Falta completar el nombre' ,
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          this.UsuarioService.getUserForUser(this.form.get('usuario').value).subscribe(
            res=>{
              const aux= (res['body']);
              if(aux['status']==718){// NO existe usuario con este nick
                swal.fire({
                  icon: 'error',
                  title: 'Nick ya utilizado, elige otro' ,
                  showConfirmButton: false,
                  timer: 1500
                })
              }
              if(aux['status']==717){//  existe usuario con este nick
                this.panelActual++;
              }
            },
            err=>{
              console.log(err);
            }
          )
        } 
      }

    }
    newForm(){
      this.form= new FormGroup({
        usuario: new FormControl('',[Validators.required]),
        pais: new FormControl('',[Validators.required]),
        email: new FormControl('',[Validators.required]),
        password: new FormControl('',[Validators.required])
      });
    }

}
