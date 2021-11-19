import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriesModel } from '../models/categories.model';
import { GetSetService } from './getSet.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  api = "http://localhost:8000/transations/";
  tokenAccess = this.token.getAccessToken();
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.tokenAccess}`
  });

  constructor(private http: HttpClient, private token: GetSetService) { }

  createCategory(category: CategoriesModel) {
    return this.http.post(this.api + 'categorias/', category, { headers: this.headers })
  }

  getCategories() {
    return this.http.get(this.api + 'categorias/', { headers: this.headers })
  }

  getCategoryDetail(id: any) {
    return this.http.get(this.api + 'categorias/' + id, { headers: this.headers })
  }

  updateCategory(id: any, category: CategoriesModel) {
    return this.http.put(this.api + 'categorias/' + id, category, { headers: this.headers })
  }

  deleteCategory(id: any) {
    return this.http.delete(this.api + "categorias/" + id, { headers: this.headers });
  }

}
