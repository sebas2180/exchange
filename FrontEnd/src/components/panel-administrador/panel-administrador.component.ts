import { DepositosComponent } from './../depositos/depositos.component';

import { AuthserviceService } from 'src/app/services/authservice.service';
import { DepositoService } from 'src/app/services/deposito/deposito.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';


@Component({
  selector: 'panel-administrador',
  templateUrl: './panel-administrador.component.html',
  styleUrls: ['./panel-administrador.component.scss']
})
export class PanelAdministradorComponent implements OnInit {
  
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort,{ static: true }) sort: MatSort;
@ViewChild('depositos') tablaDepositos:DepositosComponent;


// displayedColumns: string[] = ['id','pais','fecha','monto','status'];
  transacciones:number =100;
  confirmadas:number =40;
  verificacion:number =60;

  constructor(private TransaccionService: DepositoService,private authService : AuthserviceService) { }

  ngOnInit(): void {
  }

}
