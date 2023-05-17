import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeclerationMasterService {

  Currdate: string;
  Dataforchart: any[] = [];
  ColSpanValue:any[]=[];



  constructor() { 
    const today = new Date();
    this.Currdate = formatDate(today, "yyy-MM-dd", 'en-US');
  }
}
