import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { URL_SERVICES } from 'src/environments/environment';

declare var iziToast:any;
declare var $:any;
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-galeria-producto',
  templateUrl: './galeria-producto.component.html',
  styleUrls: ['./galeria-producto.component.css']
})
export class GaleriaProductoComponent implements OnInit {
  public url = URL_SERVICES;
  public producto :any = {};
  public id = '';

  public file : any = undefined;
  public load_btn = false;
  public load_btn_eliminar = false;
  public load_data = false;

  constructor(
    private _route:ActivatedRoute,
    private _productoService: ProductoService
  ) { }

  init_data(){
    this.load_data = true;
    this._productoService.getById(this.id).subscribe(
      response=>{
       if(response.data == undefined){
        this.producto = undefined;
        this.load_data = false;
       }else{
         this.producto = response.data;
         this.load_data = false;
       }

      },
    );
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this.init_data();
      }
    );
  }

  fileChangeEvent(event:any):void{
    var file:any;
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
        $('#input-img').val('');
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
      $('#input-img').val('');
      this.file = undefined;
    }
    
    console.log(this.file);
    
  }

  subir_imagen(){
    if(this.file != undefined){
      let data = {
        imagen: this.file,
        _id: uuidv4()
      }
      this.load_btn = true;
      this._productoService.insertImage(this.id,data).subscribe(
        response=>{
          this.init_data();
          $('#input-img').val('');
          this.load_btn = false;
        }
      );
    }else{
      iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'Debe seleccionar una imagen para subir'
      });
    }
  }

  eliminar(id:any, modalIndex: number){
    this.load_btn_eliminar = true;
    this._productoService.deleteImage(this.id,{_id:id}).subscribe(
      response=>{
        iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Se eliminó correctamente la imagen.'
        });

        $('#delete-'+modalIndex).modal('hide');
        $('.modal-backdrop').remove();

        this.load_btn_eliminar = false;

        this.init_data();

        
      },
      error=>{
        iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Ocurrió un error en el servidor.'
        });
        console.log(error);
        this.load_btn_eliminar = false;
      }
    )
  }

}
