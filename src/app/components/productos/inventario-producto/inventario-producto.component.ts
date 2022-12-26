import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductoService } from 'src/app/services/producto/producto.service';
import { VariedadService } from 'src/app/services/variedad/variedad.service';
declare var iziToast:any;
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent implements OnInit {

  public id = '';
  public producto : any  = {};
  public inventarios : Array<any>=[];
  public variedades : Array<any>=[];
  public arr_inventario: Array<any>=[];
  public inventario : any = {
    variedad: ''
  }

  public load_btn = false;

  public page = 1;
  public pageSize = 40;

  public load_del = false;
  public load_data = true;

  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService,
    private _variedadService: VariedadService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this.load_data = true;
        
        this._productoService.getById(this.id).subscribe(
          response=>{
           if(response.data == undefined){
            this.producto = undefined;
            this.load_data = false;
           }else{
             this.producto = response.data;
             
            
             this._productoService.getInventarioByProduct(this.producto._id).subscribe(
               response=>{
                  this.inventarios = response.data;
                  this.listar_variedades();
               }
             )
             this.load_data = false;
           }
            
          }
        );
        
      }
    );
  }

  filterVariedades(data: any) {
    const usedVariedades = this.inventarios.reduce((acc:any, item:any) => (
      [...acc, item.variedad._id]
    ), [])
      
    this.variedades = data.filter((item:any) => (
      !usedVariedades.includes(item._id)
    ));
  }

  listar_variedades(){
    this._variedadService.getByProduct(this.id).subscribe(
      response=>{
        this.filterVariedades(response.data)
        this.load_data = false;
      }
    );
  }

  registro_inventario(inventarioForm:any){
    if(inventarioForm.valid){
       
      let data = {
        producto: this.producto._id,
        variedad: this.inventario.variedad,
        cantidad: inventarioForm.value.cantidad,
      }

      this._productoService.insertInventario(data).subscribe(
        response=>{
          iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position: 'topRight',
              message: 'Se agrego el nuevo stock al producto.'
          });

          this._productoService.getInventarioByProduct(this.producto._id).subscribe(
            response=>{
               this.inventarios = response.data;
               this.filterVariedades(this.variedades)
            }
          )
          
        },
        error=>{
          console.log(error);
          
        }
      )
        
    }else{
      iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'Los datos del formulario no son validos'
      });
    }
  }

  eliminar(id: string) {

  }

}
