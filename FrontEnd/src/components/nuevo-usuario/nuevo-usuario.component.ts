import { trigger, style, state, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { ManejoFechasService } from './../../../shared/services/manejoFechasService/manejo-fechas.service';
import { UsuarioService } from './../../app/services/usuarioService.service';
import { AuthserviceService } from './../../app/services/authservice.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal  from 'sweetalert2';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.scss'],
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
export class NuevoUsuarioComponent implements OnInit {

  @Input() isAdministrador: boolean = false;
  constructor( private AuthserviceService: AuthserviceService,
                private UsuarioService : UsuarioService,
                private ManejoFechasService: ManejoFechasService,
                private router: Router) {
    //UsuarioService.isAdministrador();
    UsuarioService.canActivate();


  }
  form: FormGroup;
  panelActual: number=1;
  hide = true;
  paises: string[] = [ 'ARGENTINA','BRASIL','CHILE','URUGUAY','PARAGUAY','ESPAÑA'];
  ngOnInit(): void {
    this.newForm();
          var userRamdom=(Math.random())*1000000;
          var userRamdom2='pwd'+(Math.trunc(userRamdom));
          this.form.patchValue({password:userRamdom2});
          this.form.patchValue({create_at: this.ManejoFechasService.createDateCreateAt()});
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
        password: new FormControl('',[Validators.required]),
        create_at: new FormControl('',[Validators.required])
      });
    }
    guardarUsuario(){
      const dataForm= new FormData();
      dataForm.append('usuario',this.form.get('usuario').value);
      dataForm.append('email',this.form.get('email').value);
      dataForm.append('password',this.form.get('password').value);
      dataForm.append('pais',this.form.get('pais').value);
      dataForm.append('create_at',this.form.get('create_at').value);
      this.UsuarioService.addUsuario(dataForm).subscribe(
        res=>{
          console.log(res);
          swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 2200
          }).then(
            res=> {
              this.router.navigate(['/panelAdministrador']);
          })
        },
        err=>{
          swal.fire({
            icon: 'error',
            title: 'Error al guardar el usuario, intentalo luego',
            showConfirmButton: false,
            showCancelButton: true
          }).then(
            res=> {
              this.router.navigate(['/PanelBeneficiarios']);
          })
          console.log(err);
        }
      )
    }

}
