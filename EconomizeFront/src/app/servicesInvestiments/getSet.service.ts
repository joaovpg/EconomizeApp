import { Injectable } from '@angular/core';
import { Accounts } from '../models/accounts.model';
import { CategoriesModel } from '../models/categories.model';
import { InvestimentsModel } from '../models/investiments.model';

@Injectable({
  providedIn: 'root'
})
export class GetSetService {

  account: Accounts = new Accounts();
  category: CategoriesModel = new CategoriesModel();
  investiment: InvestimentsModel = new InvestimentsModel();
  totalCategory: Array<any> = new Array();
  categoryArray: Array<any> = new Array();
  colorsArray: Array<any> = new Array();

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


  setTransation(transations: InvestimentsModel) {
    this.investiment.id = transations.id;
    this.investiment.descricao = transations.descricao;
    this.investiment.valor = transations.valor;
    this.investiment.data = transations.data;
    this.investiment.tipo = transations.tipo;
    this.investiment.idUsuario = transations.idUsuario;
    this.investiment.idConta = transations.idConta;
    this.investiment.idCategorias = transations.idCategorias;
  }

  getTransation() {
    return this.investiment;
  }



  setTotalCategory(index: any, values: any) {
    this.totalCategory[index] = values;
  }

  getTotalCategory() {
    return this.totalCategory;
  }

  setCategoryArray(values: any) {
    this.categoryArray = values;
  }

  getCategoryArray() {
    return this.categoryArray;
  }

  setColorsArray(values: any) {
    this.colorsArray = values;
  }

  getColorsArray() {
    return this.colorsArray;
  }

}

