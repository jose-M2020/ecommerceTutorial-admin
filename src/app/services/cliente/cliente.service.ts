import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_SERVICES } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url = `${URL_SERVICES}cliente/`;

  constructor(
    private _http : HttpClient
  ) { }

  get():Observable<any>{
    return this._http.get(this.url);
  }
}
