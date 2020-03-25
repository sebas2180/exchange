import { PanelBeneficiarioServiceService } from './../panel-beneficiarios/service/panel-beneficiario-service.service';
import { BeneficiarioService } from './../../app/services/beneficiario/beneficiario.service';
import { BeneficiarioModule } from './../../app/models/beneficiario/beneficiario.module';
import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import  Swal  from 'sweetalert2';
@Component({
  selector: 'app-beneficiario',
  templateUrl: './beneficiario.component.html',
  styleUrls: ['./beneficiario.component.scss']
})
export class BeneficiarioComponent implements OnInit {
  @Input() beneficiario: BeneficiarioModule;
  @Output() esVisible = new EventEmitter();
  @Output() cliente = new EventEmitter();
  @Output() bene = new EventEmitter();
  titular : string;
  outOutBeneficiario:number;
  constructor(private BeneficiarioService: BeneficiarioService,
              public panelBeneficiarioService : PanelBeneficiarioServiceService) { }

  ngOnInit(): void {
    this.titular = this.beneficiario.apellido+' '+this.beneficiario.nombre;
    console.log('gggre');
    console.log(this.beneficiario);
  }
  deleteBeneficiario(){
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if (result.value) {
        this.confirmarAlerta();
        Swal.fire(
          'Borrado!',
          'El beneficiario ya no existe.',
          'success'
        )
      }
    })
  }

  ver_depositos(nro_beneficiario:number){
    this.outOutBeneficiario=nro_beneficiario;
    this.esVisible.emit(true);
    this.cliente.emit(true);
    this.bene.emit(nro_beneficiario);
  }
  confirmarAlerta(){
    this.BeneficiarioService.deleteBeneficiario(this.beneficiario.id).subscribe(
      res=>{
        this.BeneficiarioService.beneficiarios.forEach(element => {
          const i = this.BeneficiarioService.beneficiarios.indexOf(this.beneficiario);
          this.BeneficiarioService.beneficiarios.splice(i,1);
        });
      },
      err=>{
        alert('Hubo un error');
      }
    );
  }
}
