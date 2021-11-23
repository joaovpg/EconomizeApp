import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Accounts } from '../models/accounts.model';
import { GetSetService } from './getSet.service';

@Injectable({
  providedIn: 'root'
})
export class BankAccountsService {
  api = "http://localhost:8000/investiments/";
  tokenAccess = this.token.getAccessToken();

  constructor(private http: HttpClient, private token: GetSetService) { }

  createAccounts(accounts: Accounts) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenAccess}`
    });

    return this.http.post(this.api + 'contas/', accounts, { headers: headers })
  }

  getAccounts() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenAccess}`
    });

    return this.http.get(this.api + 'contas/', { headers: headers })
  }

  getAccountDetail(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenAccess}`
    });

    return this.http.get(this.api + 'contas/' + id, { headers: headers })
  }

  updtAccount(id: any, conta: Accounts) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenAccess}`
    });

    return this.http.put(this.api + 'contas/' + id, conta, { headers: headers })
  }

  deleteAccount(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenAccess}`
    });

    return this.http.delete(this.api + "contas/" + id, { headers: headers });
  }

}