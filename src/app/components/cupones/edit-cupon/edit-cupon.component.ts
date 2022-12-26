import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuponService } from 'src/app/services/cupon/cupon.service';
declare var iziToast:any;


@Component({
  selector: 'app-edit-cupon',
  templateUrl: './edit-cupon.component.html',
  styleUrls: ['./edit-cupon.component.css']
})
export class EditCuponComponent implements OnInit {

  public cupon : any = {
    disponibilidad: '',
    tipo: ''
  };
  public load_btn = false;
  public id = '';
  public load_data = true;

  constructor(
    private _cuponService:CuponService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        console.log(this.id);
        
        this._cuponService.getById(this.id).subscribe(
          response=>{
            if(response.data == undefined){
                this.cupon = undefined;
                this.load_data =false;
            }else{
              this.cupon= response.data;
              this.load_data =false;
            }

          }
        )
      }
    )
  }

  registro(registroForm:any){
    if(registroForm.valid){
      this.load_btn = true;
      this._cuponService.update(this.id,this.cupon).subscribe(
        response=>{  
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Se actualizó correctamente el cupón.'
        });

          this.load_btn = false;

          this._router.navigate(['/cupones']);

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

}
