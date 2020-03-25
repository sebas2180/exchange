import { DepositoService } from 'src/app/services/deposito/deposito.service';
import { DepositoModule } from './../../app/models/deposito/deposito.module';
import { ManejoFechasService } from './../../../shared/services/manejoFechasService/manejo-fechas.service';
import { DashboardService } from './../../app/services/dasboard/dashboard.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'nuevo-dashboard',
  templateUrl: './nuevo-dashboard.component.html',
  styleUrls: ['./nuevo-dashboard.component.scss']
})
export class NuevoDashboardComponent implements OnInit {
  @Input() idDeposito: number;
  isSeleted:boolean = false;
  isPhotoError = false;
  dashForm : FormGroup;
  submitted : boolean = false;
  uploadError: string = '';
  deposito: DepositoModule;
  constructor(private dashService: DashboardService,
    private fb: FormBuilder,
    private ManejoFechasService: ManejoFechasService,
    private DepositoService: DepositoService) { 
      this.dashForm = this.fb.group({
        photo: ['',Validators.compose([Validators.required])],
        create_at: ['0',Validators.compose([Validators.required])],     
        id_deposito: ['0',Validators.compose([Validators.required])],
      });
    }

  ngOnInit(): void {
    console.log('idDeposito   '+this.idDeposito);
    this.DepositoService.getDepositosForId(this.idDeposito).subscribe(
      res=>{
        const aux=(res['body']);
        console.log(aux["0"]);
        this.deposito=aux["0"];
      },err=>{
        console.log(err);
      }
    )

    console.log(this.deposito);
        this.newForm();
        
  }
  changeIsSelected(e){
    this.isSeleted=e;
  }
  onFileSelect(file: Event) {
    this.dashForm.patchValue({ photo: file });
    this.dashForm.get('photo').updateValueAndValidity();
  }
  newForm(){
    this.dashForm = this.fb.group({
      photo: ['',Validators.compose([Validators.required])],
      create_at: [this.ManejoFechasService.createDateCreateAt(),Validators.compose([Validators.required])],
      id_deposito: [this.deposito.id,Validators.compose([Validators.required])],
    });
  }
  volver(){

  }
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
    formData.append('photo', this.dashForm.get('photo').value);
    // formData.append('create_at', this.dashForm.get('create_at').value);
    // formData.append('id_deposito', this.dashForm.get('photo').value);

    this.dashService.uppload(formData).subscribe(
      res=>{
        console.log('enviado')
      },
      err=>{
        console.log('enviado error')
      });

  }

}
