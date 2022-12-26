import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente/cliente.service';

@Component({
  selector: 'app-index-clientes',
  templateUrl: './index-clientes.component.html',
  styleUrls: ['./index-clientes.component.css']
})
export class IndexClientesComponent implements OnInit {

  public clientes :Array<any>= [];
  public clientes_const  :Array<any>= [];
  public page = 1;
  public pageSize = 24;
  public filtro = '';
  constructor(
    private _ClienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this._ClienteService.get().subscribe(
      response=>{
        this.clientes_const = response.data;
        this.clientes= this.clientes_const;
      }
    );
  }

  filtrar_cliente(){
    if(this.filtro){
      var term = new RegExp(this.filtro.toString().trim() , 'i');
      this.clientes = this.clientes_const.filter(item=>term.test(item.nombres)||term.test(item.apellidos)||term.test(item.email)||term.test(item.dni)||term.test(item.telefono)||term.test(item._id));
    }else{
      this.clientes = this.clientes_const;
    }
  }

}
