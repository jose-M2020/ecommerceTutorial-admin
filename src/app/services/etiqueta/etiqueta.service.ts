import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtiquetaService {
  url = `${URL_SERVICES}etiqueta/`;
  constructor(
    private _http : HttpClient
  ) { }

  get():Observable<any>{
    return this._http.get(this.url);
  }

  delete(id:any):Observable<any>{
    return this._http.delete(`${this.url}${id}`);
  }

  insert(data:any):Observable<any>{
    return this._http.post(this.url,data);
  }
}
