import { Injectable } from '@angular/core';
import { Accounts } from '../models/accounts.model';
import { CategoriesModel } from '../models/categories.model';

@Injectable({
  providedIn: 'root'
})
export class GetSetService {

  account: Accounts = new Accounts();
  category: CategoriesModel = new CategoriesModel();

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

  setAccount(accounts: Accounts) {
    this.account.id = accounts.id;
    this.account.nome = accounts.nome;
    this.account.saldo = accounts.saldo;
  }

  getAccount() {
    return this.account;
  }


  setCategory(categories: CategoriesModel) {
    this.category.id = categories.id;
    this.category.tipo = categories.tipo;

  }

  getCategory() {
    return this.category;
  }
}

