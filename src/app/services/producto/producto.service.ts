import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { URL_SERVICES } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = `${URL_SERVICES}producto/`;

  constructor(
    private _http : HttpClient,
  ) {}

  insert(data:any,file:any):Observable<any>{
    const fd = new FormData();
    fd.append('titulo',data.titulo);
    fd.append('etiquetas',JSON.stringify(data.etiquetas));
    fd.append('precio',data.precio);
    fd.append('precio_dolar',data.precio_dolar);
    fd.append('peso',data.peso);
    fd.append('sku',data.sku);
    fd.append('descripcion',data.descripcion);
    fd.append('contenido',data.contenido);
    fd.append('genero',data.genero);
    fd.append('categoria',data.categoria);
    fd.append('visibilidad',data.visibilidad);
    fd.append('tallas_str','');
    fd.append('portada',file);

    return this._http.post(`${this.url}`,fd);
  }

  get():Observable<any>{
    return this._http.get(`${this.url}all`);
  }

  getById(id:any):Observable<any>{
    return this._http.get(`${this.url}${id}`);
  }

  getEtiquetas(id:any):Observable<any>{
    return this._http.get(`${this.url}${id}/etiquetas`);
  }

  deleteEtiqueta(id:any):Observable<any>{
    return this._http.delete(`${this.url}${id}/etiqueta`);
  }

  insertEtiqueta(data:any):Observable<any>{
    return this._http.post(`${this.url}etiqueta`, data);
  }

  update(data:any,id:any):Observable<any>{
    if(data.newImage){
      const fd = new FormData();
      fd.append('titulo',data.titulo);
      fd.append('stock',data.stock);
      fd.append('precio_antes_soles',data.precio_antes_soles);
      fd.append('precio_antes_dolares',data.precio_antes_dolares);
      fd.append('precio',data.precio);
      fd.append('precio_dolar',data.precio_dolar);
      fd.append('peso',data.peso);
      fd.append('sku',data.sku);
      fd.append('descripcion',data.descripcion);
      fd.append('contenido',data.contenido);
      fd.append('categoria',data.categoria);
      fd.append('genero',data.genero);
      fd.append('visibilidad',data.visibilidad);
      fd.append('portada',data.portada);
      fd.append('newImage',data.newImage);

      return this._http.put(`${this.url}${id}`, fd);
    }else{
      return this._http.put(`${this.url}${id}`, data);
    }
  }

  updateVariedad(data:any,id:any):Observable<any>{
    return this._http.put(`${this.url}${id}/variedad`, data);
  }

  insertImage(id:any,data:any):Observable<any>{
    const fd = new FormData();
    fd.append('_id',data._id);
    fd.append('imagen',data.imagen);
    return this._http.put(`${this.url}${id}/addImage`, fd);
  }

  deleteImage(id:any,data:any):Observable<any>{
    return this._http.put(`${this.url}${id}/deleteImage`, data);
  }

  changeProductStatus(id:any,estado:any):Observable<any>{
    return this._http.get(`${this.url}${id}/${estado}/changeStatus`);
  }

  // Inventario

  getInventario():Observable<any>{
    return this._http.get(`${this.url}inventario/all`);
  }

  getInventarioByProduct(id:any):Observable<any>{
    return this._http.get(`${this.url}${id}/inventario`);
  }

  insertInventario(data:any):Observable<any>{
    return this._http.post(`${this.url}inventario`,data);
  }
}
