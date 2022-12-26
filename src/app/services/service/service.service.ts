import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url = URL_SERVICES;

  constructor(
    private _http : HttpClient,
  ) { }

  get_categorias():Observable<any>{
    return this._http.get('./assets/categorias.json');
  }
}
