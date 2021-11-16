import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Accounts } from '../models/accounts.model';
import { TokensService } from './tokens.service';

@Injectable({
  providedIn: 'root'
})
export class TransationsService {
  api = "http://localhost:8000/transations/";
  tokenAccess = this.token.getToken();

  constructor(private http: HttpClient, private token: TokensService) { }

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
}
