import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_SERVICES } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  url = `${URL_SERVICES}venta/`;

  constructor(
    private _http : HttpClient
  ) { }

  get():Observable<any>{
    return this._http.get(this.url);
  }

  getById(id:any):Observable<any>{
    return this._http.get(`${this.url}${id}`);
  }

  getPayment(id:any):Observable<any>{
    const headers = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer TEST-1969113897364750-112421-c18d39f0a612f245314ee366ae06f407-242440663');
    return this._http.get('https://api.mercadopago.com/v1/payments/'+id, {headers});
  }

  setFinished(id:any,data:any):Observable<any>{
    return this._http.put(`${this.url}${id}/setFinished`, data);
  }

  delete(id:any):Observable<any>{
    return this._http.delete(`${this.url}${id}`);
  }
  setShipped(id:any,data:any):Observable<any>{
    return this._http.put(`${this.url}${id}/setShipped`, data);
  }

  confirmPayment(id:any,data:any):Observable<any>{
    return this._http.put(`${this.url}${id}/confirmPayment`, data);
  }

  insert(data:any):Observable<any>{
    return this._http.post(`${this.url}register`,data);
  }

  //KPI
  getKPIMensuales(config?: any):Observable<any>{
    return this._http.post(this.url+'KPI/mensuales', config);
  }
}
