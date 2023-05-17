import { Component, Input, OnInit, AfterViewInit, SimpleChanges, HostListener } from '@angular/core';
// import { Chart, registerables } from 'chart.js';
import { ChartData } from 'src/app/Classes/ChartData.class';
import { DeclerationMasterService } from '../decleration-master.service';
import { MasterService } from '../masterRepo.service';
import { Chart, registerables } from 'chart.js';

declare const window: any;

@Component({
  selector: 'ims-charts',
  templateUrl: './ims-charts.component.html',
  styleUrls: ['./ims-charts.component.scss']
})
export class imsCharts implements OnInit,AfterViewInit {

  isVisible:boolean=false;
  datamode:any;
  ChangesValue:any
  dashboardData:any[]=[];
  @Input() myinputMsg!: string;
  @Input() chartname!: string;
  @Input('ChartType') chartType!: string;
  @Input('colSpan') colSpan!: string;
  @Input('canvasId') canvasId!: number;
  @Input('index') index!: number;
  @Input('chartData') chardata:ChartData[]=[];
  public chart: any;
  Labels:string[]=[];
  Yaxis:string[]=[];
  Xaxis:string[]=[];
  colors:string[]=[];
  @Input('options')options:any;
  @Input('barLine') barLine?: number;


  chartData:any[] =[];
  indexData:any[] = [];
  chartTypeData:any[]=[];
  colSpanData:any[]=[];


  constructor(public masterService: MasterService,  public declerationService: DeclerationMasterService,) {
    Chart.register(...registerables);
    // this.chartType="doughnut"

   }
  

  ngOnInit() {
  
  }
  
//   @HostListener('document:click', ['$event', '$event.target'])
//     onClick(event: MouseEvent){
//       this.isVisible=true;
//     }

distroyChart(){
  let iid =  this.ChangesValue?.canvasId?.currentValue
 var chart = Object.values(Chart.instances).filter((c) => c.canvas.id == iid).pop()
 chart?.destroy();

}


  ChooseChartType(value:any){
    this.chartType= value.target.value;
    this.getCanvasChrtType(this.chartType)
    this.reload();
    
  }
 
  ChooseColSpan(value: any) {
    const newValue = value.target.value;
    this.declerationService.ColSpanValue[this.index] = newValue;
    console.log('ccc', this.declerationService.ColSpanValue[this.index]);
     this.reload();
    
  }
  showhide(){}
  
  reload(){
    let iid = this.ChangesValue?.canvasId?.currentValue;
    let chartsddata: any[] = [];
    chartsddata = this.chartData[0];
    this.distroyChart();
    this.createChart(chartsddata, iid, this.chartType);

  }

createChart(chexkdataObj:any,canvasId:string,chartType:string){
  var data:any;
   let chexkdata:any=[];
  //  chexkdata.push(chexkdataObj);
  // console.log('chexkdata', chexkdata)
  if(chartType=='bar' && chexkdataObj.length >0){
     data = this.mapDataForBar(chexkdataObj)

  }
  if(chartType=='pie' || chartType=='doughnut' && chexkdataObj.length >0){
     data = this.mapDataForPie(chexkdataObj)

  }
  if(chartType=='line' && chexkdataObj.length >0){
     data = this.mapDataForLine(chexkdataObj,'line')

  }

    
    //   if (window.myCharts != undefined )
    //   window.myCharts.destroy();
    // window.myCharts  = 
 var myChart =new Chart(`${canvasId}`, data)
 console.log('myChart', myChart)
  


console.log('cdataid',window.myCharts  );

}


mapDataForBar(chartdata:ChartData[]){

    var lbs= chartdata.filter((thing,i,data)=>data.findIndex(t=>t.group==thing.group)===i).map(x=>x.group);
    var categories= chartdata.filter((thing,i,data)=>data.findIndex(t=>t.category==thing.category)===i);
   
    
    var categoryDataSets:any[]=[]
    categories.forEach(cat=>{
    var catData=chartdata.filter(x=>x.category==cat.category).map(y=>y.value);
    
    var categorydata = { 
      label:cat.category,
      data:catData,
      backgroundColor:cat.color
    }
    categoryDataSets.push(categorydata);   
  });
  return {
    type:'bar',
    data:{
      labels:lbs,
      datasets:categoryDataSets,
    }
  } 
  
}

mapDataForLine(chartdata:ChartData[],charttype:string='line'){
  var lbs= chartdata.filter((thing,i,data)=>data.findIndex(t=>t.group==thing.group)===i).map(x=>x.group);
  var categories= chartdata.filter((thing,i,data)=>data.findIndex(t=>t.category==thing.category)===i);
  var categoryDataSets:any[]=[]
  categories.forEach(cat=>{
    var catData=chartdata.filter(x=>x.category==cat.category).map(y=>y.label);
    var categorydata = { 
      label:'last month',
      data:catData,
      backgroundColor:cat.color,
      tension:0.3,
      
    }
    var catData2=chartdata.filter(x=>x.category==cat.category).map(y=>y.value);
    var categorydata2 = { 
      label:'this month',
      data:catData2,
      backgroundColor:cat.color,
      tension:0.3
    }
    categoryDataSets.push(categorydata);
    categoryDataSets.push(categorydata2);
  });
  return {
    type:charttype,
    data:{
      labels:lbs,
      datasets:categoryDataSets,
    },
    options: this.options
  } 
  
}

mapDataForPie(chartdata:ChartData[]){
  var lbs= chartdata.filter((thing,i,data)=>data.findIndex(t=>t.group==thing.group)===i).map(x=>x.group);
  // var categories= chartdata.filter((thing,i,data)=>data.findIndex(t=>t.category==thing.category)===i);
  var categoryDataSets:any[]=[]
  // categories.forEach(cat=>{
    var value=chartdata.map(y=>y.value);
    var label=chartdata.map(y=>y.label);
   
    var categorydata = { 
      // label:label,
      data:value,
      // backgroundColor:cat.color
    }
    categoryDataSets.push(categorydata);
  // });
  return {
    type:this.chartType,
    data:{
      labels:lbs,
      datasets:categoryDataSets,
    }
  } 
  
}


  ngOnChanges(changes:SimpleChanges) {
    console.log('changes', changes,changes?.['chardata']?.currentValue)
        // this.chartType='pie'
        this.chartData.push(changes?.['chardata']?.currentValue);        
        this.indexData.push(changes?.['canvasId']?.currentValue);
        this.chartTypeData.push(changes?.['chartType']?.currentValue)
        this.colSpanData.push(changes?.['colSpan']?.currentValue)

        this.ChangesValue=changes
    console.log('chartType',this.chartType)

    }

  
  ngAfterViewInit() {
    this.getchartdataAId();
    }

 getchartdataAId(){
  for (let index = 0; index < this.indexData.length; index++) {
    this.createChart(this.chartData[index],this.indexData[index],this.chartTypeData[index] );    
    this.getCanvaId(this.indexData[index]); 
    this.getCanvasChrtType(this.chartTypeData[index]);   
    this.getColSpanValue(this.colSpanData[index]); 
         
  }

 }

 getCanvaId(canvaid:string):string{
  return canvaid;
 }
 getCanvasChrtType(getChartype:string):string{
  return getChartype;
 }
 getColSpanValue(ColSpanValue:string):string{
  return ColSpanValue;
 }

}
