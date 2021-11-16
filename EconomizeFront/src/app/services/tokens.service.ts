import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokensService {

  constructor() { }

  setAccessToken(token: any) {
    window.localStorage.setItem("accessToken", token);
  }

  getAccessToken() {
    return window.localStorage.getItem("accessToken");
  }

  setRefreshToken(token: any) {
    window.localStorage.setItem("refreshToken", token);
  }

  getRefreshToken() {
    return window.localStorage.getItem("refreshToken");
  }

  setId(id: any) {
    window.localStorage.setItem("id", id);
  }

  getId() {
    return window.localStorage.getItem("id");
  }

}
