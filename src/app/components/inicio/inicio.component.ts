import { Component, OnInit, ViewChild } from '@angular/core';
// import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { VentaService } from 'src/app/services/venta/venta.service';

interface Config {
  profitRange: Date[]
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  // TODO: show correct values from api
  public total_ganancia:number = 0;
  public total_mes:number = 0;
  public total_mes_anterior:number = 0;
  public count_ventas:number = 0;
  
  constructor(
    private _ventaService: VentaService
  ) { }

  ngOnInit() {
    this.getKPI();
  }

  getKPI(){
    this._ventaService.getKPIMensuales().subscribe(
      res=>{
        this.total_ganancia = res.total_ganancia;
        this.total_mes = res.total_mes;
        this.count_ventas = res.count_ventas;
        this.total_mes_anterior = res.total_mes_anterior;
      }
    );
  }

  dateChanged(e: any){
    this.getKPI();
  }
}
