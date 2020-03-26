import { DepositoModule } from 'src/app/models/deposito/deposito.module';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
 
@Component({
  selector: 'show-montos',
  templateUrl: './show-montos.component.html',
  styleUrls: ['./show-montos.component.scss']
})
export class ShowMontosComponent implements OnInit {
  @Input() deposito: DepositoModule;
 
  @Output() changeStatusMontos: EventEmitter<boolean> = new EventEmitter();
  // viewMontos:boolean=false;
    constructor() { }

  ngOnInit(): void {
  }
  // change(){
  //   if(this.viewMontos){
  //     this.viewMontos=false;
  //     this.changeStatusMontos.emit(this.viewMontos);
  //   }else{
  //     this.viewMontos=true;
  //     this.changeStatusMontos.emit(this.viewMontos);
  //   }
  // }

}
