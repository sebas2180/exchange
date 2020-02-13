
import { DepositoModule } from './../../app/models/deposito/deposito.module';
import { DepositoService } from 'src/app/services/deposito/deposito.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-depositos',
  templateUrl: './depositos.component.html',
  styleUrls: ['./depositos.component.scss']
})
export class DepositosComponent implements OnInit {
  depositos: DepositoModule[];
  deposito: DepositoModule ;
  monto : number =12;
  constructor(private TransaccionService: DepositoService) { }

  ngOnInit(): void {
     this.TransaccionService.getAllDepositosForUser(1).subscribe(
      res => {
              this.deposito = res;
              this.depositos = res['body'];
       },
              err => {alert('ERROR:     '+JSON.stringify(err)); }
    );

  }

}
