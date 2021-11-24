import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransationsModel } from '../models/transations.model';
import { GetSetService } from './getSet.service';

@Injectable({
  providedIn: 'root'
})
export class TransationsService {

  api = "http://localhost:8000/transations/";
  tokenAccess = this.token.getAccessToken();
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.tokenAccess}`
  });

  constructor(private http: HttpClient, private token: GetSetService) { }

  createTransation(transations: any) {
    return this.http.post(this.api + 'transacoes/', transations, { headers: this.headers })
  }

  getTransations(year: any, month: any) {
    return this.http.get(this.api + 'transacoes?year=' + year + '&month=' + month, { headers: this.headers })
  }

  getTransationDetail(id: any) {
    return this.http.get(this.api + 'transacoes/' + id, { headers: this.headers })
  }

  updateTransation(id: any, transation: TransationsModel) {
    return this.http.put(this.api + 'transacoes/' + id, transation, { headers: this.headers })
  }

  deleteTransation(id: any) {
    return this.http.delete(this.api + "transacoes/" + id, { headers: this.headers });
  }

  getTotal(tipo: any, year: any, month: any) {
    return this.http.get(this.api + 'transacoes/total?tipo=' + tipo + '&year=' + year + '&month=' + month, { headers: this.headers });
  }

  getTotalCategory(idCategorias: any, year: any, month: any) {
    return this.http.get(this.api + 'transacoes/categoria-total?idCategorias=' + idCategorias + '&year=' + year + '&month=' + month + '&tipo=Despesa', { headers: this.headers });
  }

}