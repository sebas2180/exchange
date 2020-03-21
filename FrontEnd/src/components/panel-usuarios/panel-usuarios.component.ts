import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-usuarios',
  templateUrl: './panel-usuarios.component.html',
  styleUrls: ['./panel-usuarios.component.scss']
})
export class PanelUsuariosComponent implements OnInit {

  isLodeader: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
  updateLoader(isLoader){
    this.isLodeader=isLoader;
    console.log(this.isLodeader);
  }
}
