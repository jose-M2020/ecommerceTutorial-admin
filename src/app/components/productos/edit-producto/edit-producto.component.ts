import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EtiquetaService } from 'src/app/services/etiqueta/etiqueta.service';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { ServiceService } from 'src/app/services/service/service.service';
import { URL_SERVICES } from 'src/environments/environment';
declare var iziToast:any;
declare var $:any;


@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.css']
})
export class EditProductoComponent implements OnInit {

  public id = '';
  public load_data = false;
  public producto: any = {
    categoria: '',
    visibilidad: ''
  };
  public imgSelect : any | ArrayBuffer = 'assets/img/01.jpg';
  public categorias: Array<any> = [];
  public config : any = {};
  public load_btn = false;
  public file : any = undefined;


  public arr_etiquetas: Array<any> = [];
  public new_etiqueta = '';
  public load_data_etiqueta = false;
  public etiquetas : Array<any> = [];
  public load_etiquetas = false;
  public url = URL_SERVICES;

  constructor(
    private _productoService: ProductoService,
    private _etiquetaService: EtiquetaService,
    private _serviceService: ServiceService,
    private _router:Router,
    private _route : ActivatedRoute,
  ) { 
    this.config = {
      height: 500
    }
  }

  ngOnInit(): void {
    this._serviceService.get_categorias().subscribe(
      response=>{
        this.categorias = response;
      }
    );

    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this.load_data = true;
        this._productoService.getById(this.id).subscribe(
          response=>{
           if(response.data == undefined){
            this.load_data = false;
            this.producto = undefined;
            
           }else{
             this.load_data = false;
             this.producto = response.data;
             this.listar_etiquetas();
             this.listar_etiquetas_producto();
             this.imgSelect = this.producto.portada.secure_url;
           }
            
          },
          error=>{
            console.log(error);
          }
        );
        
      }
    );
  }

  listar_etiquetas(){
    this.load_data_etiqueta = true;
    this._etiquetaService.get().subscribe(
      response=>{
        this.etiquetas = response.data;
        this.load_data_etiqueta = false;
      }
    );
  }

  listar_etiquetas_producto(){
    this.load_etiquetas = true;
    this._productoService.getEtiquetas(this.id).subscribe(
      response=>{
        this.arr_etiquetas = response.data;
        this.load_etiquetas = false;
      }
    );
  }


  fileChangeEvent(event:any):void{
    var file : any;
    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0];

    }else{
      iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'No hay un imagen de envio'
      });
    }

    if(file.size <= 4000000){

      if(file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg'){
    
        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        
        reader.readAsDataURL(file);

        $('#input-portada').text(file.name);
        this.file = file;

      }else{
        iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'El archivo debe ser una imagen'
        });
        $('#input-portada').text('Seleccionar imagen');
        this.imgSelect = 'assets/img/01.jpg';
        this.file = undefined;
      }
    }else{
      iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'La imagen no puede superar los 4MB'
      });
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
    }
  }

  eliminar_etiqueta(id:any){
    this.load_etiquetas = true;
    this._productoService.deleteEtiqueta(id).subscribe(
      response=>{
        this.listar_etiquetas_producto();
        this.load_etiquetas = false;
      }
    );
  }

  agregar_etiqueta(){
  
    let data = {
      etiqueta: this.new_etiqueta,
      producto: this.id
    }
    this.load_etiquetas = true;
    this._productoService.insertEtiqueta(data).subscribe(
      response=>{
        this.listar_etiquetas_producto();
        this.load_etiquetas = false;
      }
    );
  }

  actualizar(actualizarForm:any){
    if(actualizarForm.valid){

      var data : any= {};

      if(this.file != undefined){
        // data.portada = this.file;
        data.newImage = this.file;
      }

      if(!this.producto.precio_antes_soles || this.producto.precio_antes_soles == undefined){
        this.producto.precio_antes_soles = 0;
      }

      if(!this.producto.precio_antes_dolares || this.producto.precio_antes_dolares == undefined){
        this.producto.precio_antes_dolares = 0;
      }

      data.titulo = this.producto.titulo;
      data.stock = this.producto.stock;
      data.precio_antes_soles = this.producto.precio_antes_soles;
      data.precio_antes_dolares = this.producto.precio_antes_dolares;
      data.precio = this.producto.precio;
      data.precio_dolar = this.producto.precio_dolar;
      data.peso = this.producto.peso;
      data.sku = this.producto.sku;
      data.categoria = this.producto.categoria;
      data.descripcion = this.producto.descripcion;
      data.contenido = this.producto.contenido;
      data.genero = this.producto.genero;
      data.portada = JSON.stringify(this.producto.portada);
      data.visibilidad = this.producto.visibilidad;

      this.load_btn = true;

      this._productoService.update(data,this.id).subscribe(
        response=>{
          iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position: 'topRight',
              message: 'Se actualizó correctamente el nuevo producto.'
          });

          this.load_btn = false;

          this._router.navigate(['/productos']);
        },
        error=>{
          this.load_btn = false;
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
      this.load_btn = false;
    }
}

}
