import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuponService {
  url = `${URL_SERVICES}cupon/`;

  constructor(
    private _http : HttpClient
  ) { }

  insert(data:any):Observable<any>{
    return this._http.post(this.url,data);
  }

  get():Observable<any>{
    return this._http.get(this.url);
  }

  getById(id:any):Observable<any>{
    return this._http.get(`${this.url}${id}`);
  }

  update(id:any,data:any):Observable<any>{
    return this._http.put(`${this.url}${id}`,data);
  }

  delete(id:any):Observable<any>{
    return this._http.delete(`${this.url}${id}`);
  }

}
