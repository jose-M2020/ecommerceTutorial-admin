import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  url = `${URL_SERVICES}direccion/`;

  constructor(
    private _http : HttpClient
  ) { }

  getByClient(id:any):Observable<any>{
    return this._http.get(`${this.url}cliente/${id}`);
  }
}
