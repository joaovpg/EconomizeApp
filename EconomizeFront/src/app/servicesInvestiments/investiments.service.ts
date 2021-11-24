import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InvestimentsModel } from '../models/investiments.model';
import { GetSetService } from '../services/getSet.service';

@Injectable({
  providedIn: 'root'
})
export class InvestimentService {

  api = "http://localhost:8000/investiments/";
  tokenAccess = this.token.getAccessToken();
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.tokenAccess}`
  });

  constructor(private http: HttpClient, private token: GetSetService) { }

  createTransation(transations: any) {
    return this.http.post(this.api + 'investiments/', transations, { headers: this.headers })
  }

  getTransations(year: any, month: any) {
    return this.http.get(this.api + 'investiments?year=' + year + '&month=' + month, { headers: this.headers })
  }

  getTransationDetail(id: any) {
    return this.http.get(this.api + 'investiments/' + id, { headers: this.headers })
  }

  updateTransation(id: any, transation: InvestimentsModel) {
    return this.http.put(this.api + 'investiments/' + id, transation, { headers: this.headers })
  }

  deleteTransation(id: any) {
    return this.http.delete(this.api + "investiments/" + id, { headers: this.headers });
  }

  getTotal(tipo: any, year: any, month: any) {
    return this.http.get(this.api + 'investiments/total?tipo=' + tipo + '&year=' + year + '&month=' + month, { headers: this.headers });
  }
  
  getTotalCategory(idCategorias: any, year: any, month: any) {
    return this.http.get(this.api + 'investiments/categoria-total?idCategorias=' + idCategorias + '&year=' + year + '&month=' + month + '&tipo=Investimento', { headers: this.headers });
  }

}