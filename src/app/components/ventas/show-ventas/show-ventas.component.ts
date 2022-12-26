import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VentaService } from 'src/app/services/venta/venta.service';
import { URL_SERVICES } from 'src/environments/environment';
declare var iziToast:any;
declare var $:any;

@Component({
  selector: 'app-show-ventas',
  templateUrl: './show-ventas.component.html',
  styleUrls: ['./show-ventas.component.css']
})
export class ShowVentasComponent implements OnInit {
  public url = URL_SERVICES;
  public venta : any={};
  public id = '';
  public load = false;
  
  public detalles : Array<any> = [];
  public load_data = true;

  public totalstar = 5;

  public review : any = {};
  public load_send = false;
  public load_conf_pago = false;
  public load_final= false;
  public load_del= false;
  public tracking = '';
  public pago : any = {};

  constructor(
    private _route:ActivatedRoute,
    private _ventaService: VentaService,
    private _router:Router
    ) {}


  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];

        this.init_data();
      }
    );
  }

  init_data(){
    this._ventaService.getById(this.id).subscribe(
      response=>{
        if(response.data != undefined){
          this.venta = response.data;

          if(this.venta.metodo_pago=='Tarjeta de crédito'){
            this._ventaService.getPayment(this.venta.transaccion).subscribe(
              response=>{
                this.pago = response;
              }
            );
          }
      
          this.detalles = response.detalles;
          this.load_data = false;
        }else{
          this.venta = undefined;
          this.load_data = false;
        }
      }
    );
  }
  
  finalzar(id:any){
    this.load_final = true;
    this._ventaService.setFinished(id,{data:''}).subscribe(
      response=>{
        iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'La venta fue cerrada correctamente.'
        });
        $('#openConfirmarPago').modal('hide');
        $('.modal-backdrop').remove();
        this.load_final = false;
        this.init_data();
      }
    );
  }

  enviar(id:any){
    if(this.tracking){
      this.load_send = true;
      this._ventaService.setShipped(id,{tracking:this.tracking}).subscribe(
        response=>{
          iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position: 'topRight',
              message: 'La orden fue marcada como enviada.'
          });
          $('#openEnviado').modal('hide');
          $('.modal-backdrop').remove();
          this.load_send = false;
          this.init_data();
        }
      );
    }else{
      iziToast.show({
        title: 'DANGER',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-success',
        position: 'topRight',
        message: 'Ingrese el numero de seguimiento.'
    });
    }
  }

  eliminar(id:any){
    this.load_del = true;
    this._ventaService.delete(id).subscribe(
      response=>{
        iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'El pedido fue eliminada correctamente.'
        });
        $('#openEliminar').modal('hide');
        $('.modal-backdrop').remove();
        this._router.navigate(['/ventas']);
        this.load_del = false;
      }
    );
  }

  confirmar_pago(id:any){
    this.load_conf_pago = true;
    this._ventaService.confirmPayment(id,{data:''}).subscribe(
      response=>{
        iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'El pago fue confirmado correctamente.'
        });
        $('#openConfirmarPago').modal('hide');
        $('.modal-backdrop').remove();
        this.load_conf_pago = false;
        this.init_data();
      }
    );
  }
}
