import { DashboardModule } from './../../app/models/dashboard/dashboard.module';
import { DashboardService } from './../../app/services/dasboard/dashboard.service';
import { Component, OnInit, Input } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-show-dashboard',
  templateUrl: './show-dashboard.component.html',
  styleUrls: ['./show-dashboard.component.scss']
})
export class ShowDashboardComponent implements OnInit {
  @Input() id_deposito:number =15;
  public image: string ='';
  dashboard :DashboardModule;
  attachmentList:any ;
  constructor(private DashboardService:DashboardService) {
    this.DashboardService.getDashboard(this.id_deposito)
    .subscribe(
      response => {

      },
      error => console.error(error)
    
      );

   }
  ngOnInit(): void {
  }
}
