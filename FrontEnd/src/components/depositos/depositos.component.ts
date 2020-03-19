import { MatTableModule } from '@angular/material/table';

import { DepositoModule } from './../../app/models/deposito/deposito.module';
import { DepositoService } from 'src/app/services/deposito/deposito.service';
import { Component, OnInit, ViewChild, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';

import { AuthserviceService } from 'src/app/services/authservice.service';
import {  MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
export interface PeriodicElement {

}
@Component({
  selector: 'app-depositos',
  templateUrl: './depositos.component.html',
  styleUrls: ['./depositos.component.scss']
})
export class DepositosComponent implements OnInit,AfterViewInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @Input() esCliente:boolean =false;
  @Input() nroBeneficiario:number =-1;
  isFiltrado: boolean=false;
  depositos: DepositoModule[];
  deposito: DepositoModule ;
  aux : string ;
  displayedColumns: string[] = ['id','id_destinatario','pais','fecha','monto','status','action'];
  dataSource;
  constructor(private TransaccionService: DepositoService,private authService : AuthserviceService) { }


  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    
    if(this.esCliente){
      this.displayedColumns = ['id','pais','fecha','monto'];
    }
    this.TransaccionService.CanActivate();
    const data = JSON.parse(this.authService.getLocal());
    if(this.nroBeneficiario>0){
      this.TransaccionService.getAllDepositosForBeneficiario(data['id'],this.nroBeneficiario).subscribe(
        res => {
              this.deposito = res;
              this.depositos = res['body'];
              this.dataSource = new MatTableDataSource<DepositoModule>(this.depositos);
             // console.log(this.depositos);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
               },
                err => {alert('ERROR:     '+JSON.stringify(err)); }
      );

    }else{
      this.TransaccionService.getAllDepositosForUser(data['id']).subscribe(
        res => {
              this.deposito = res;
              this.depositos = res['body'];
              this.dataSource = new MatTableDataSource<DepositoModule>(this.depositos);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
               },
                err => {alert('ERROR:     '+JSON.stringify(err)); }
      );
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  edit(dep: DepositoModule) {

  }
  filtrado(){
    this.isFiltrado=true;

  }
  cerrarFiltro(){
    this.isFiltrado=false;
    this.dataSource.filter = '';
  }
}
