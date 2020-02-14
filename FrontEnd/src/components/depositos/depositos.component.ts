import { MatTableModule } from '@angular/material/table';

import { DepositoModule } from './../../app/models/deposito/deposito.module';
import { DepositoService } from 'src/app/services/deposito/deposito.service';
import { Component, OnInit,ViewChild, AfterViewInit  } from '@angular/core';

import { AuthserviceService } from 'src/app/services/authservice.service';
import {  MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-depositos',
  templateUrl: './depositos.component.html',
  styleUrls: ['./depositos.component.scss']
})
export class DepositosComponent implements OnInit,AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;
  
  depositos: DepositoModule[];
  deposito: DepositoModule ;
  aux : string ;
  displayedColumns: string[] = ['id','pais','fecha','monto','status'];
  
  // displayedColumns: string[] = ['id', 'monto', 'pais', 'status','fecha'];
  // //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource =  new MatTableDataSource();
  constructor(private TransaccionService: DepositoService,private authService : AuthserviceService) { }


  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
    
    this.TransaccionService.CanActivate();
    const data = JSON.parse(this.authService.getLocal());
    this.TransaccionService.getAllDepositosForUser(data['id']).subscribe(
      res => {
              this.deposito = res;
             this.depositos = res['body'];
              this.dataSource = new MatTableDataSource(this.depositos);
              // this.dataSource=new MatTableDataSource(this.ELEMENT_DATA);
              this.dataSource.sort = this.sort;
             },
              err => {alert('ERROR:     '+JSON.stringify(err)); }
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
