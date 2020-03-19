import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManejoFechasService {

  constructor() { }

  convertDateToCreateAt(date: Date){
    const pipe = new DatePipe('en-US');
    const dateCreate = pipe.transform(date,'yyy-MM-dd hh:mm:ss');
    return dateCreate;
  }
  createDateCreateAt(){
    const date= Date.now();
    const pipe = new DatePipe('en-US');
    const dateToday = pipe.transform(date,'yyy-MM-dd hh:mm:ss');
    return dateToday;
  }
}
