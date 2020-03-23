import { trigger, state, transition, animate, style } from '@angular/animations';
import { TasasService } from './../../app/services/tasas/tasas.service';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { TasaModule } from 'src/app/models/tasa/tasa.module';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'tabla-tasas',
  templateUrl: './tabla-tasas.component.html',
  styleUrls: ['./tabla-tasas.component.scss'],
  animations:[
    trigger('enterState',[
      state('void',style({
        transform:'translateX(-100%)',
        opacity:0
      })),
      transition(':enter',[
        animate('0.5s',style({
          transform:'translateX(0)',
        opacity:1
        }))
      ])
    ])
  ]
})
export class TablaTasasComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @Output() updateTasa = new EventEmitter();
  displayedColumns: string[] = ['pais','create_at','tasa','acciones'];
  arrayTasas: TasaModule[];
  dataSource;
  isLoading: boolean = true;
  constructor(private TasasService: TasasService) { 
    this.TasasService.getTasas().subscribe(
      res=>{
       
        this.arrayTasas= res['msj'];
        this.dataSource =  new MatTableDataSource<TasaModule>(this.arrayTasas);
        this.dataSource.sort =this.sort;
        this.isLoading=false;

      },
      err=>{
        
      }
    )
  }
  ngOnInit(): void {
  }
  update(id){
    this.updateTasa.emit(id);
  }
}
