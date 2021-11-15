import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokensService {

  constructor() { }

  setToken(token: any) {
    window.localStorage.setItem("token", token);
  }

  getToken() {
    return window.localStorage.getItem("token");
  }

}
