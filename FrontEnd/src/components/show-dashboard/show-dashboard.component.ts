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
      data => {
        console.log(data);
        saveAs(data, this.id_deposito)},
      error => console.error(error)
    
      );
    // .subscribe(
    //   res=>{
    //     console.log(res);
    //     //const aux = res['body'];
    //    // this.dashboard= aux['dashboard'];
    //   //  console.log(this.dashboard);
    //     const reader  = new FileReader();
    //   reader.onload = () => {
    //     this.image  = reader.result as string;
    //   };
    //   reader.readAsDataURL(this.dashboard.imagen);
    //   },err=>{
    //     console.log(err);
    //   }
    // )
   }
  ngOnInit(): void {
  }
}
