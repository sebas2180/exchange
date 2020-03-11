import { PanelBeneficiarioServiceService } from './service/panel-beneficiario-service.service';
import { AuthserviceService } from './../../app/services/authservice.service';
import { BeneficiarioService } from './../../app/services/beneficiario/beneficiario.service';
import { Component, OnInit ,ViewChild, Input} from '@angular/core';
import { BeneficiarioModule } from 'src/app/models/beneficiario/beneficiario.module';


@Component({
  selector: 'app-panel-beneficiarios',
  templateUrl: './panel-beneficiarios.component.html',
  styleUrls: ['./panel-beneficiarios.component.scss']
})
export class PanelBeneficiariosComponent implements OnInit {

  beneficiarios: BeneficiarioModule[];
  beneficiariosAux: BeneficiarioModule[];
  constructor(public BeneficiariosAutho : BeneficiarioService,
              private authService:AuthserviceService,
              public panelService: PanelBeneficiarioServiceService) {
  }
  ngOnInit(): void {
    const data = JSON.parse(this.authService.getLocal());
    console.log(data['id']);
    this.BeneficiariosAutho.getBeneficiarios(data['id']).subscribe(
      res=>{
        this.beneficiariosAux = res['body'];
        this.BeneficiariosAutho.beneficiarios= this.beneficiariosAux['beneficiario'];
      },
      err=>{

      }
    )

  }

}
