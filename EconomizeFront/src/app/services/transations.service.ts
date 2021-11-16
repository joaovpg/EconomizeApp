import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokensService } from './tokens.service';

@Injectable({
  providedIn: 'root'
})
export class TransationsService {
  api = "http://localhost:8000/transations/";
  tokenAccess = this.token.getToken();

  constructor(private http: HttpClient, private token: TokensService) { }

  getAccounts() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenAccess}`
    });

    return this.http.get(this.api + 'contas/', { headers: headers })
  }
}
