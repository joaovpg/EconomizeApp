import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokensService {

  idAccount: any;

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

  setIdAccount(id: any) {
    return window.localStorage.setItem("idAccount", id)
  }

  getIdAccount() {
    return window.localStorage.getItem("idAccount");
  }

}
