// To both display a data property and update that property when the user makes changes, two-way data binding is used.
// [( )] = BANANA IN A BOX
import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { ChartsModule } from 'ng2-charts/ng2-charts';

declare var XLSX: any;


@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {
  title: string = 'Welcome to world of freedom';
  loginId: string = '';
  pwd: string = '';

  excelDataSample: any[];
   excelDataSample_month: any[];
    excelDataSample_days: any[];

dataPresent: boolean = false;

  constructor(private _router: Router) {};
  data: Object = {};

//seriesAData: any[] = this.excelDataSample_month;
 seriesAData: any[];
 seriesBData: any[];
//seriesAData: any[] = ['65', '32','43', '21'];
//seriesBData: any[] = ['January', 'February', 'March', 'April'];


formSubmit(){
console.log(this.data);


  if(this.data.loginId == "admin" && this.data.pwd == "admin"){
    this._router.navigate(['admin']);
  }
  else{
    this._router.navigate(['user']);
  }

  var url = "app/Demo_excel.xlsx";

  console.log('Sanket1');

var oReq = new XMLHttpRequest();
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";
 
oReq.onload = function(e) {
  var arraybuffer = oReq.response;
 
  /* convert data to binary string */
  var data = new Uint8Array(arraybuffer);
  var arr = new Array();
  for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  var bstr = arr.join("");
 
  /* Call XLSX */
  var workbook = XLSX.read(bstr, {type:"binary"});

  var total_incidents_sheet = workbook.SheetNames[0];
  var month_wise_sheet = workbook.SheetNames[1];
  var day_wise_sheet = workbook.SheetNames[2];
  //console.log("sheet name : " + total_incidents_sheet);
  //console.log("sheet name : " + month_wise_sheet);
  //var address_of_cell = 'A1';
 
/* Get worksheet */
//console.log('Sanket2');
var worksheet_incidents = workbook.Sheets[total_incidents_sheet];
var worksheet_months = workbook.Sheets[month_wise_sheet];
var worksheet_days = workbook.Sheets[day_wise_sheet];
//console.log(XLSX.utils.sheet_to_json(worksheet_incidents));

var excelData = XLSX.utils.sheet_to_json(worksheet_incidents, {raw:true});
var excelData_month = XLSX.utils.sheet_to_json(worksheet_months, {raw:true});
var excelData_days = XLSX.utils.sheet_to_json(worksheet_days, {raw:true});
console.log("Testing..." + excelData_month);
localStorage.setItem('excelData', JSON.stringify(excelData));
localStorage.setItem('excelData_month', JSON.stringify(excelData_month));
localStorage.setItem('excelData_days', JSON.stringify(excelData_days));

//console.log(XLSX.utils.sheet_to_json(worksheet, {header:1}));

//console.log(XLSX.utils.sheet_to_json(worksheet, {raw:true}));

  }
 //console.log('Sanket3');
oReq.send();
this.excelDataSample = JSON.parse(localStorage.getItem('excelData'));
this.excelDataSample_month = JSON.parse(localStorage.getItem('excelData_month'));
this.excelDataSample_days = JSON.parse(localStorage.getItem('excelData_days'));
console.log(this.excelDataSample_month);
console.log('Sanket4');

for (var i = 0; i < this.excelDataSample_month.length; i++) {
    console.log("PAIR " + i + ": " + this.excelDataSample_month[i].Data);
    console.log("PAIR " + i + ": " + this.excelDataSample_month[i].Month);
    //this.seriesAData.add(this.excelDataSample_month[i].Data);
    //this.seriesBData.add(this.excelDataSample_month[i].Month);
}
//this.dataPresent = true;

}

//if(this.dataPresent){

// testing chart---------------
// lineChart
  public lineChartData:Array<any> = [
    {data: this.seriesAData, label: 'Incidents Month Wise'}//,
    //{data: [28, 32], label: 'Series B'},
    //{data: [18, 22], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = this.seriesBData;
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }//,
    // { // dark grey
    //   backgroundColor: 'rgba(77,83,96,0.2)',
    //   borderColor: 'rgba(77,83,96,1)',
    //   pointBackgroundColor: 'rgba(77,83,96,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(77,83,96,1)'
    // },
    // { // grey
    //   backgroundColor: 'rgba(148,159,177,0.2)',
    //   borderColor: 'rgba(148,159,177,1)',
    //   pointBackgroundColor: 'rgba(148,159,177,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    // }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
//}

  // end testing chart----------------

}
