import { DepositoService } from 'src/app/services/deposito/deposito.service';
import { DepositoModule } from './../../app/models/deposito/deposito.module';
import { ManejoFechasService } from './../../../shared/services/manejoFechasService/manejo-fechas.service';
import { DashboardService } from './../../app/services/dasboard/dashboard.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'nuevo-dashboard',
  templateUrl: './nuevo-dashboard.component.html',
  styleUrls: ['./nuevo-dashboard.component.scss']
})
export class NuevoDashboardComponent implements OnInit {
  @Input() idDeposito: number;

  @Output() setIsMostrarDash: EventEmitter<number> = new EventEmitter();
  viewDestinatario:boolean =true;
  viewMontos:boolean =true;
  viewRemitente:boolean =true;
  isSeleted:boolean = false;
  isPhotoError = false;
  isDepositoOk:boolean = false;
  dashForm : FormGroup;
  submitted : boolean = false;
  uploadError: string = '';
  deposito: DepositoModule;
  constructor(private dashService: DashboardService,
    private fb: FormBuilder,
    private ManejoFechasService: ManejoFechasService,
    private DepositoService: DepositoService) { 
      //this.idDeposito=dashService.isMostrarDash;
      this.dashForm = this.fb.group({
        photo: ['',Validators.compose([Validators.required])],
        create_at: ['0',Validators.compose([Validators.required])],
        id_deposito: [' ',Validators.compose([Validators.required])],
      });
    }

  ngOnInit(): void {
    console.log('idDeposito   '+this.idDeposito);
    this.DepositoService.getDepositosForId(this.idDeposito).subscribe(
      res=>{
        const aux=(res['body']);
        //console.log(aux["0"]);
        this.deposito=aux["0"];
        //console.log(this.deposito);
        this.newForm();
        this.isDepositoOk=true;

      },err=>{
        console.log(err);
      }
    )
        
  }
  changeIsSelected(e){
    this.isSeleted=e;
  }
  change(){
    if(this.viewMontos){
      this.viewMontos=false;
    }else{
      this.viewMontos=true;
    }
  }
  changeStatusRemitente(){
    if(this.viewRemitente){
      this.viewRemitente=false;
    }else{
      this.viewRemitente=true;
    }
  }
  changeStatusDestinatario(){
      if(this.viewDestinatario){
        this.viewDestinatario=false;
      }else{
        this.viewDestinatario=true;
      }
  }
  onFileSelect(file: Event) {
    this.dashForm.patchValue({ photo: file });
    this.dashForm.get('photo').updateValueAndValidity();
  }
  newForm(){
    this.dashForm = this.fb.group({
      photo: ['',Validators.compose([Validators.required])],
      create_at: [this.ManejoFechasService.createDateCreateAt(),Validators.compose([Validators.required])],
      id_deposito: [this.deposito.id,Validators.compose([Validators.required])]
    });
  }
  volver(){

  }
  close(index){}
  open(index){}
  enviar(form){
    this.submitted = true;
    if(!this.dashForm.valid) {
      return false;
    }
    if (this.dashForm.get('photo').invalid) {
      this.isPhotoError = true;
    }
    this.uploadError = '';
    const formData = new FormData();
    const formData2 = new FormData();
    formData.append('photo', this.dashForm.get('photo').value);
    formData2.append('create_at',this.ManejoFechasService.createDateCreateAt());
    formData2.append('id_deposito', this.deposito.id.toString());
    this.dashService.uppload(formData).subscribe(
      res=>{
        if(res['status']==732){
          console.log('Es status 732')
          const id_foto= res['msj'];
          formData2.append('id',id_foto);
          this.dashService.upploadInfo(formData2).subscribe(
            res2=>{
              if(res2['status']==734){
                swal.fire({
                  icon: 'success',
                  title: 'CARGA DE COMPROBANTE EXITOSA' ,
                  showConfirmButton: false,
                  timer: 1500
                }).then(
                  res=>{
                    this.setIsMostrarDash.emit(-1);
                  }
                )
              }else{
                swal.fire({
                  icon: 'error',
                  title: 'ERROR AL CARGAR EL COMPROBANTE' ,
                  showConfirmButton: false,
                  timer: 1500
                })
              }
            },
            err=>{
              console.log(err)
            });
          ///
        }
      },
      err=>{
        console.log('enviado error')
      });

  }

}
