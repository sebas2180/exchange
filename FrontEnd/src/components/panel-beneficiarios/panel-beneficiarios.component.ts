import { PanelBeneficiarioServiceService } from './service/panel-beneficiario-service.service';
import { AuthserviceService } from './../../app/services/authservice.service';
import { BeneficiarioService } from './../../app/services/beneficiario/beneficiario.service';
import { Component, OnInit ,ViewChild, Input} from '@angular/core';
import { BeneficiarioModule } from 'src/app/models/beneficiario/beneficiario.module';
import { trigger, style, state, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-panel-beneficiarios',
  templateUrl: './panel-beneficiarios.component.html',
  styleUrls: ['./panel-beneficiarios.component.scss'],
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
export class PanelBeneficiariosComponent implements OnInit {

  cliente:number;
  beneficiario:number;
  isVisible:boolean=false;
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
  confVisible(isVisible){
   this.isVisible=isVisible;
  }
  confCliente(cliente:number){
    this.cliente=cliente;
   }
   confBeneficiario(beneficiario:number){
    this.beneficiario=beneficiario;
   }
}
