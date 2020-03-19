import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { DashboardService } from './../../app/services/dasboard/dashboard.service';
import { DashboardModule } from './../../app/models/dashboard/dashboard.module';
import { UsuarioService } from './../../app/services/usuarioService.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileUploapComponent} from'../../../shared/components/file-uploap/file-uploap.component';
@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent implements OnInit {


  isPhotoError = false;
  dashForm : FormGroup;
  submitted : boolean = false;
  uploadError: string = '';
  constructor(private dashService: DashboardService,private fb: FormBuilder) { }
  newForm(){
    this.dashForm = this.fb.group({
      photo: ['',Validators.compose([Validators.required])]
    });
  }
  onFileSelect(file: Event) {
    this.dashForm.patchValue({ photo: file });
    this.dashForm.get('photo').updateValueAndValidity();
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

    this.dashService.uppload(formData).subscribe(
      res=>{
        console.log('enviado')
      },
      err=>{
        console.log('enviado error')
      });

  }

  ngOnInit(): void {
    this.newForm();
  }

}
