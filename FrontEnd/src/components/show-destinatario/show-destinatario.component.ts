import { DepositoModule } from 'src/app/models/deposito/deposito.module';
import { DepositosComponent } from './../depositos/depositos.component';
import { BeneficiarioModule } from './../../app/models/beneficiario/beneficiario.module';
import { BeneficiarioService } from './../../app/services/beneficiario/beneficiario.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'show-destinatario',
  templateUrl: './show-destinatario.component.html',
  styleUrls: ['./show-destinatario.component.scss']
})
export class ShowDestinatarioComponent implements OnInit {

  @Input() deposito: DepositoModule;
  beneficiario: BeneficiarioModule = new BeneficiarioModule;
  constructor(private BeneficiarioService: BeneficiarioService) {
   }

  ngOnInit(): void {
    console.log(this.deposito);
    if(this.deposito.id_destinatario>0){
      this.BeneficiarioService.getBeneficiario(this.deposito.id_destinatario).subscribe(
        res=>{
          const aux =res['body']
          this.beneficiario=aux['beneficiario'];
          console.log(aux);
        },err=>{
          console.log(err);
        }
      )
    }
  }
}
