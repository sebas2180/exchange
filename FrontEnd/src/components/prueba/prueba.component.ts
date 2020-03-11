import { DashboardService } from './../../app/services/dasboard/dashboard.service';
import { DashboardModule } from './../../app/models/dashboard/dashboard.module';
import { UsuarioService } from './../../app/services/usuarioService.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent implements OnInit {
  file : File;
  constructor(private service: DashboardService) { }

  enviar() {
    
    this.service.uppload(this.file).subscribe(
      res => {
        console.log('enviado');
      },
      err => {
        console.log(err);
      }
    )
  }
  
  ngOnInit(): void {
  }

}
