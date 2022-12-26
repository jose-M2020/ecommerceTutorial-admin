import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: string[] = ['Confirmados', 'Recuperados', 'Activos', 'Defunciones'];
  public pieChartData:any = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: any = [
    {
      backgroundColor: [
        'rgba(200,200,0,0.9)',
        'rgba(0,210,0,0.9)',
        'rgba(255,0,0,0.9)',
        'rgba(136,136,136,0.9)'
      ]
    }
  ];

  countries: string[] = [];
  country: string = 'Argentina';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.getCountries();
    this.loadData('');
  }

  loadData(event: any): void {
    if (this.country) {
      this.clear();
      this.httpClient.get<any>('https://pomber.github.io/covid19/timeseries.json')
                    .pipe(map( data => data[this.country]))
                    .subscribe(
                      (data: any) => {
                        const last = data.pop();
                        this.pieChartData[0] = last.confirmed;
                        this.pieChartData[1] = last.recovered;
                        this.pieChartData[2] = last.confirmed - last.recovered - last.deaths;
                        this.pieChartData[3] = last.deaths;
                      }
                    );
    }
  }

  getCountries(): void {
    this.httpClient.get<any>('https://pomber.github.io/covid19/timeseries.json').subscribe(
      (data:any) => {
        this.countries = Object.keys(data);
      }
    );
  }

  clear(): void {
    this.pieChartData = [];
  }
}
