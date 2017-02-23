    // To both display a data property and update that property when the user makes changes, two-way data binding is used.
    // [( )] = BANANA IN A BOX
    import { Component } from '@angular/core';
    import {Router} from '@angular/router';
    import { ChartsModule } from 'ng2-charts/ng2-charts';
    import {RequestOptions, Request, RequestMethod} from '@angular/http';

    declare var XLSX: any;


    @Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'
    })
    export class AppComponent {
    title: string = 'Welcome to world of freedom';
    loginId: string = '';
    pwd: string = '';

    selectedXDays: string = '0';
    selectedYDays: string = '0';

    selectedXMonth: string = '0';
    selectedYMonth: string = '0';

    excelDataSample: any[];
        excelDataSample_month: any[];
        excelDataSample_days: any[];

        excelDataSample_month_column: any[];
        excelDataSample_days_column: any[];

        seriesAData: any[] = [];
        seriesBData: any[] = [];

        seriesCData: any[] = [];
        seriesDData: any[] = [];

        monthlyData: string = '';
    dailyData: string = '';
        seriesMonthData: string[] = [];
        seriesDaysData: string[] = [];

    constructor(private _router: Router) {};
    data: Object = {};

    onSelectXDays(selectedValue: string) {
        this.selectedXDays = selectedValue;
    }
    
    onSelectYDays(selectedValue: string) {
        this.selectedYDays = selectedValue;
    }

    onSelectXMonth(selectedValue: string) {
        this.selectedXMonth = selectedValue;
    }
    
    onSelectYMonth(selectedValue: string) {
        this.selectedYMonth = selectedValue;
    }

    loadGraphForMonth(){
        this.lineChartData_month = null;
        this.lineChartLabels_month = null;
        
        if(this.selectedXMonth == 'Month' && this.selectedYMonth == 'Data'){
        for (var i = 0; i < this.excelDataSample_month.length; i++) {
            this.seriesAData[i] = this.excelDataSample_month[i].Data;
            this.seriesBData[i] = this.excelDataSample_month[i].Month;
        } }else if(this.selectedXMonth == 'Data' && this.selectedYMonth == 'Month'){
            for (var i = 0; i < this.excelDataSample_month.length; i++) {
            this.seriesAData[i] = this.excelDataSample_month[i].Month;
            this.seriesBData[i] = this.excelDataSample_month[i].Data;
            }
        }

        this.lineChartData_month = [
            {data: this.seriesAData, label: 'Incidents Month Wise'}
        ];
        this.lineChartLabels_month = this.seriesBData;

    }

    loadGraphForDays(){
        this.lineChartData_days = null;
        this.lineChartLabels_days = null;

        if(this.selectedXDays == 'Day' && this.selectedYDays == 'Data'){
        for (var i = 0; i < this.excelDataSample_days.length; i++) {
            this.seriesCData[i] = this.excelDataSample_days[i].Data;
            this.seriesDData[i] = this.excelDataSample_days[i].Day;
        }
        } else  if(this.selectedXDays == 'Data' && this.selectedYDays == 'Day'){
        for (var i = 0; i < this.excelDataSample_days.length; i++) {
            this.seriesCData[i] = this.excelDataSample_days[i].Day;
            this.seriesDData[i] = this.excelDataSample_days[i].Data;
         }
        }

        this.lineChartData_days = [
            {data: this.seriesCData, label: 'Incidents Day Wise'}
        ];
        this.lineChartLabels_days = this.seriesDData;

    }


    // fileChange(event) {
    //     let fileList: FileList = event.target.files;
    //     if(fileList.length > 0) {
    //         let file: File = fileList[0];
    //         let formData:FormData = new FormData();
    //         formData.append('uploadFile', file, file.name);
    //         let headers = new Headers();
    //         headers.append('Content-Type', 'multipart/form-data');
    //         headers.append('Accept', 'application/json');
    //         let options = new RequestOptions({ headers: headers });
    //         this.http.post(`${this.apiEndPoint}`, formData, options)
    //             .map(res => res.json())
    //             .catch(error => Observable.throw(error))
    //             .subscribe(
    //                 data => console.log('success'),
    //                 error => console.log(error)
    //             )
    //     }
    // }

    formSubmit(){

    //   if(this.data.loginId == "admin" && this.data.pwd == "admin"){
    //     this._router.navigate(['admin']);
    //   }
    //   else{
    //     this._router.navigate(['user']);
    //   }

    var url = "app/Demo_excel.xlsx";

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
        
        var worksheet_incidents = workbook.Sheets[total_incidents_sheet];
        var worksheet_months = workbook.Sheets[month_wise_sheet];
        var worksheet_days = workbook.Sheets[day_wise_sheet];

        var excelData_column_month = XLSX.utils.sheet_to_json(worksheet_months, {header: 1});
        var excelData_column_days = XLSX.utils.sheet_to_json(worksheet_days, {header: 1});
        
        localStorage.setItem('column_days', JSON.stringify(excelData_column_days));
        localStorage.setItem('column_month', JSON.stringify(excelData_column_month));

        
        var excelData = XLSX.utils.sheet_to_json(worksheet_incidents, {raw:true});
        var excelData_month = XLSX.utils.sheet_to_json(worksheet_months, {raw:true});
        var excelData_days = XLSX.utils.sheet_to_json(worksheet_days, {raw:true});
        
        localStorage.setItem('excelData', JSON.stringify(excelData));
        localStorage.setItem('excelData_month', JSON.stringify(excelData_month));
        localStorage.setItem('excelData_days', JSON.stringify(excelData_days));
        }
        oReq.send();
        this.excelDataSample = JSON.parse(localStorage.getItem('excelData'));
        this.excelDataSample_month = JSON.parse(localStorage.getItem('excelData_month'));
        this.excelDataSample_days = JSON.parse(localStorage.getItem('excelData_days'));

        this.excelDataSample_days_column = JSON.parse(localStorage.getItem('column_days'));
        this.excelDataSample_month_column = JSON.parse(localStorage.getItem('column_month'));
        
        // for (var i = 0; i < this.excelDataSample_month.length; i++) {
        //     this.seriesAData[i] = this.excelDataSample_month[i].Data;
        //     this.seriesBData[i] = this.excelDataSample_month[i].Month;
        // }

        // for (var i = 0; i < this.excelDataSample_days.length; i++) {
        //     this.seriesCData[i] = this.excelDataSample_days[i].Data;
        //     this.seriesDData[i] = this.excelDataSample_days[i].Day;
        // }

        
            //console.log("PAIR " + i + ": " + this.excelDataSample_month_column[0]);
            this.monthlyData = this.excelDataSample_month_column[0];
            //console.log("this.monthlyData is : "+ this.monthlyData);
            //this.seriesMonthData[] = this.monthlyData.split(',');
            this.seriesMonthData[0] = "Month";
            this.seriesMonthData[1] = "Data";
        

        //console.log("PAIR " + i + ": " + this.excelDataSample_days_column[0]);
        this.dailyData = this.excelDataSample_days_column[0];
        //console.log("this.dailyData is : "+ this.dailyData);
        //this.seriesDaysData[] = this.dailyData.split(',');
        this.seriesDaysData[0] = "Day";
        this.seriesDaysData[1] = "Data";

            }

    public lineChartData_month:Array<any> = [
            {data: this.seriesAData, label: 'Incidents Month Wise'}
        ];
        public lineChartLabels_month:Array<any> = this.seriesBData;
        public lineChartOptions_month:any = {
            responsive: true
        };
        public lineChartColors_month:Array<any> = [
            { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        public lineChartLegend_month:boolean = true;
        public lineChartType_month:string = 'line';


    public lineChartData_days:Array<any> = [
            {data: this.seriesCData, label: 'Incidents Day Wise'}
        ];
        public lineChartLabels_days:Array<any> = this.seriesDData;
        public lineChartOptions_days:any = {
            responsive: true
        };
        public lineChartColors_days:Array<any> = [
            { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        public lineChartLegend_days:boolean = true;
        public lineChartType_days:string = 'line';

    }
