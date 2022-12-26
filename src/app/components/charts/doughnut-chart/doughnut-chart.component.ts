import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType, ChartData } from 'chart.js';
import { VentaService } from 'src/app/services/venta/venta.service';

interface Config {
  profitRange: Date[]
}

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit  {
  rangeDate: Date[] = [];

  public doughnutChartBgColor: string[] = [
    "#184BED",
    "#4DCDD6",
    "#6438E0",
    "#BE2CDB"
  ];
  public doughnutChart: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      { 
        data: [],
        backgroundColor: this.doughnutChartBgColor,
      }
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';
  
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(
    private _ventaService: VentaService
  ) {
    const minDate = new Date();
    const maxDate = new Date();
    minDate.setDate(maxDate.getDate() - 90);
    this.rangeDate = [minDate, maxDate];
  }
  
  // ngOnChanges(changes: SimpleChanges) {
  //     this.doughnutChart.datasets[0].data = this.chartData
  //     this.doughnutChart.labels = this.chartLabels
  //     this.chart?.update();
  //     console.log('doughnut chart updated')
  // }

  ngOnInit(){
    this.getKPI();
  }

  getKPI(){
    const config: Config = {
      profitRange: this.rangeDate
    }

    this._ventaService.getKPIMensuales(config).subscribe(
      res=>{
        const data = {
          data: [0],
          labels: ['Sin ventas']
        };

        if(res.salesStatus.length){
          data.data = res.salesStatus.reduce((acc:any, item:any) => (
            [...acc, item.count]
          ), [])
  
          data.labels = res.salesStatus.reduce((acc:any, item:any) => (
            [...acc, item._id.estado]
          ), []);
        }

        this.doughnutChart.datasets[0].data = data.data;
        this.doughnutChart.labels = data.labels;
        
        this.chart?.update();
      }
    );
  }

  dateChanged(e: any){
    setTimeout(() => {
      this.getKPI();
    }, 50)
  }

}
