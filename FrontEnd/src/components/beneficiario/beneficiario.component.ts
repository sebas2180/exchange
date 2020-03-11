import { PanelBeneficiarioServiceService } from './../panel-beneficiarios/service/panel-beneficiario-service.service';
import { BeneficiarioService } from './../../app/services/beneficiario/beneficiario.service';
import { BeneficiarioModule } from './../../app/models/beneficiario/beneficiario.module';
import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-beneficiario',
  templateUrl: './beneficiario.component.html',
  styleUrls: ['./beneficiario.component.scss']
})
export class BeneficiarioComponent implements OnInit {
  @Input() beneficiario: BeneficiarioModule;
  titular : string;
  constructor(private BeneficiarioService: BeneficiarioService,public panelBeneficiarioService : PanelBeneficiarioServiceService) { }

  ngOnInit(): void {
    this.titular = this.beneficiario.apellido+' '+this.beneficiario.nombre;
  }
  deleteBeneficiario(){
    this.panelBeneficiarioService.mostrarAlerta = true;
  }
  cerrarAlerta(){
    this.panelBeneficiarioService.mostrarAlerta = false;
  }
  confirmarAlerta(){
    this.BeneficiarioService.deleteBeneficiario(this.beneficiario.id).subscribe(
      res=>{
        this.panelBeneficiarioService.mostrarAlerta=false;
        this.BeneficiarioService.beneficiarios.forEach(element => {
          const i = this.BeneficiarioService.beneficiarios.indexOf(this.beneficiario);
          this.BeneficiarioService.beneficiarios.splice(i,1);
          this.panelBeneficiarioService.mostrarAlertaEliminado=true;
        });
      },
      err=>{
        alert('Hubo un error');
      }
    );
  }
}
