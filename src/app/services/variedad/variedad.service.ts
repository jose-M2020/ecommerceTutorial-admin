import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VariedadService {
  url = `${URL_SERVICES}variedad/`;

  constructor(
    private _http : HttpClient
  ) { }

  getByProduct(id:any):Observable<any>{
    return this._http.get(`${this.url}producto/${id}`);
  }

  delete(id:any):Observable<any>{
    return this._http.delete(`${this.url}${id}`);
  }

  insert(data:any):Observable<any>{
    return this._http.post(this.url,data);
  }

  getWithProductInfo():Observable<any>{
    return this._http.get(`${this.url}productInfo`);
  }
}
