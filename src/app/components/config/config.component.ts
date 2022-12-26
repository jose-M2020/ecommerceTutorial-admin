import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/model/config.interface';
import { ConfigService } from 'src/app/services/config/config.service';
import { v4 as uuidv4 } from 'uuid';

declare var iziToast:any;
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  public config: Config = {
    nombreTienda: '',
    envio:{
      monto_min_mexicanos: 0,
      monto_min_dolares: 0,
      envio_activacion : 'Desactivado',
    },
    categorias: {
      categoria1: [],
      categoria2: [],
      categoria3: []
    } 
  };

  categorias: any = {
    categoria1: {
      nombre: '',
      descripcion: '',
      icono: ''
    },
    categoria2: {
      nombre: '',
      categoriaPadre: '',
      descripcion: '',
      icono: ''
    },
    categoria3: {
      nombre: '',
      categoriaPadre: '',
      descripcion: '',
      icono: ''
    },
  }

  public file?: File = undefined;
  public imgSelect?: string | ArrayBuffer;

  public load_btn = false;
  public load_data = true;

  constructor(
    private _configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.init_data();
  }

  init_data(){
    this.load_data = true;
    this._configService.get().subscribe(
      response=>{
        this.config = response.data;
        this.config.categorias = response.data.categorias ||  {
          categoria1: [],
          categoria2: [],
          categoria3: []
        };
        this.imgSelect = this.config?.logo?.secure_url;

        this.load_data = false;
      }
    );
  }

  actualizar(actualizarForm:any){
    if(actualizarForm.valid){
      this.load_btn = true;
      
      const data = {
        ...this.config,
        file: this.file,
      }

      this._configService.update(data).subscribe(
        response=>{
          iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position: 'topRight',
              message: 'Se actualizó correctamente las configuraciones.'
          });
          this.load_btn = false;

          this.init_data();
        },
        error=>{
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
          message: 'Los datos del formulario no son validos'
      });
    }
  }

  fileChangeEvent(event: any){
    let file: any;

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

    if(file?.size <= 4000000){

      if(file?.type == 'image/png' || file?.type == 'image/webp' || file?.type == 'image/jpg' || file?.type == 'image/gif' || file?.type == 'image/jpeg'){
    
        const reader: any = new FileReader();
        reader.onload = (e: any) => this.imgSelect = reader.result;
        $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded');
        $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload');
        reader.readAsDataURL(file);
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
    
    console.log(this.file);
  }

  addCategory(level: number, parentCategory?: string){
    const refs: any = {
      1: {
        configRef: this.config.categorias.categoria1,
        categoriasRef: this.categorias.categoria1,
      },
      2: {
        configRef: this.config.categorias.categoria2,
        categoriasRef: this.categorias.categoria2,
      },
      3: {
        configRef: this.config.categorias.categoria3,
        categoriasRef: this.categorias.categoria3,
      },
    }

    for (let prop in refs[level].categoriasRef) {
      if(!refs[level].categoriasRef[prop]){
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'Debes completar todos los campos para la categoria' + level
        });
        return;
      }
    }
      
    refs[level].configRef.push({
      ...refs[level].categoriasRef,
      _id: uuidv4()
    })

    for (let prop in refs[level].categoriasRef) {
      refs[level].categoriasRef[prop] = '';
    }
}

  // ngDoCheck(): void {
  //   $('.cs-file-drop-preview').html("<img src="+this.imgSelect+">");
  // }
  
  getParentCatName(idPadre: string, categoriaPadre: string) {
    const categoria = this.config.categorias[categoriaPadre].find(
      (item: any) => item._id === idPadre
    )

    return categoria.nombre;
  }

  eliminar_catergoria(index: any, categoria: string){
    this.config?.categorias[categoria].splice(index, 1);
  }
}
