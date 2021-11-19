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

  getTransations() {
    return this.http.get(this.api + 'transacoes/', { headers: this.headers })
  }

  // getAccountDetail(id: any) {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.tokenAccess}`
  //   });

  //   return this.http.get(this.api + 'contas/' + id, { headers: headers })
  // }

  // // updtAccount(id: any, conta: Accounts) {
  // //   const headers = new HttpHeaders({
  // //     'Content-Type': 'application/json',
  // //     'Authorization': `Bearer ${this.tokenAccess}`
  // //   });

  // //   return this.http.put(this.api + 'contas/' + id, conta, { headers: headers })
  // // }

  // // deleteAccount(id: any) {
  // //   const headers = new HttpHeaders({
  // //     'Content-Type': 'application/json',
  // //     'Authorization': `Bearer ${this.tokenAccess}`
  // //   });

  // //   return this.http.delete(this.api + "contas/" + id, { headers: headers });
  // // }

}