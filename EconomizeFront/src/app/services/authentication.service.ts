import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { UserModel, PasswordModel } from '../models/user.model';
import { GetSetService } from './getSet.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  api = "http://127.0.0.1:8000/auth/";
  accessToken = this.token.getAccessToken();

  constructor(private http: HttpClient, private token: GetSetService) { }

  createUser(user: UserModel): Observable<any> {
    return this.http.post(this.api + 'create-user/', user);
  }

  loginUser(user: UserModel): Observable<any> {
    return this.http.post(this.api + 'login/', user);
  }

  requestResetPassword(useremail: any): Observable<any> {
    return this.http.post(this.api + 'request-reset-email', useremail);
  }

  logoutUser(refreshToken: any) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });

    return this.http.post(this.api + 'logout/', refreshToken, { headers: headers });
  }

  getAccessToken(refreshToken: any) {
    return this.http.post(this.api + 'token/refresh', refreshToken)
  }

  getUserDetail(id: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });

    return this.http.get(this.api + 'user/' + id, { headers: headers });

  }

  updateUser(id: any, user: UserModel): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });

    return this.http.put(this.api + 'user/' + id, user, { headers: headers })
  }

  deleteUser(id: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });

    return this.http.delete(this.api + 'user/' + id, { headers: headers });
  }

  changePassword(id: any, userPassword: PasswordModel): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });

    return this.http.put(this.api + 'change-password/' + id, userPassword, { headers: headers });
  }

}
