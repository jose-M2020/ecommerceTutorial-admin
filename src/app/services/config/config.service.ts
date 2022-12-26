import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  url = `${URL_SERVICES}config/`;

  constructor(
    private _http : HttpClient
  ) { }

  get():Observable<any>{
    return this._http.get(this.url);
  }

  update(data:any):Observable<any> {    
    const fd = new FormData();
    fd.append('nombreTienda',data.nombreTienda);
    fd.append('envio', JSON.stringify(data.envio));
    fd.append('categorias',JSON.stringify(data.categorias));
    fd.append('logo', JSON.stringify(data.logo));

    if(data.file){
      fd.append('file',data.file);
    }

    return this._http.put(this.url, fd);
  }
}
