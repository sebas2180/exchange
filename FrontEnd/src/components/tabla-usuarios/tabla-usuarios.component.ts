import { MatTableDataSource } from '@angular/material/table';
import { UsuarioModule } from './../../app/models/usuario/usuario.module';
import { UsuarioService } from './../../app/services/usuarioService.service';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.scss']
})
export class TablaUsuariosComponent implements OnInit {

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @Output() isLoader = new EventEmitter();
  dataSource;
  usuarios: UsuarioModule[];
  displayedColumns: string[] = ['id','usuario','nombre','pais','rol','accion'];

  constructor(private UsuarioService: UsuarioService
    ) { 
      UsuarioService.isAdministrador();
    }
  ngOnInit(): void {
    this.UsuarioService.getAllUsers().subscribe(
      res=>{
        this.usuarios = res['usuarios'];
        console.log(this.usuarios);
        const ok = this.cargarTabla();
        console.log('okkk'+ok);
      },
      err=>{
        console.log(err);
      }
    )

  }
  cargarTabla(){
    this.dataSource= new MatTableDataSource<UsuarioModule>(this.usuarios);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort =this.sort;
    this.isLoader.emit(false);
    return true;
  }
  applyFilter(e){

  }

}
