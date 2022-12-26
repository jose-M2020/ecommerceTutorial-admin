import { Component, OnInit } from '@angular/core';
import { CuponService } from 'src/app/services/cupon/cupon.service';
declare var iziToast:any;
declare var $:any;

@Component({
  selector: 'app-index-cupon',
  templateUrl: './index-cupon.component.html',
  styleUrls: ['./index-cupon.component.css']
})
export class IndexCuponComponent implements OnInit {

  public cupones :Array<any>= [];
  public cupones_const  :Array<any>= [];
  public page = 1;
  public pageSize = 24;
  public filtro = '';
  public load = false;
  constructor(
    private _cuponService:CuponService
  ) { }

  
  ngOnInit(): void {
    this.init_data();
  }

  init_data(){
    this.load = true;
    this._cuponService.get().subscribe(
      response=>{
        this.cupones_const = response.data;
        this.cupones= this.cupones_const;
        this.load = false;
      }
    );
  }

  filtrar_cupones(){
    if(this.filtro){
      var term = new RegExp(this.filtro.toString().trim() , 'i');
      this.cupones = this.cupones_const.filter(item=>term.test(item.codigo)||term.test(item.tipo)||term.test(item.disponibilidad));
    }else{
      this.cupones = this.cupones_const;
    }
  }

  eliminar(id:any){
    this._cuponService.delete(id).subscribe(
      response=>{
        iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Se eliminó correctamente el cliente.'
        });

        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').remove();

        this.init_data();
        
      },
      error=>{
        console.log(error);
        
      }
    )
  }

}
