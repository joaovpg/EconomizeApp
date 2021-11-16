import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { UserModel, PasswordModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  api = "http://127.0.0.1:8000/auth/";
  user: Observable<firebase.User | null>

  constructor(private auth: AngularFireAuth, private http: HttpClient) {
    this.user = this.auth.authState;
  }

  createUser(user: UserModel): Observable<any> {
    return this.http.post(this.api + 'create-user/', user);
  }

  loginUser(user: UserModel): Observable<any> {
    return this.http.post(this.api + 'login/', user);
  }

  requestResetPassword(useremail: any): Observable<any> {
    return this.http.post(this.api + 'request-reset-email', useremail);
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }

  getAccessToken(refreshToken: any) {
    return this.http.post(this.api + 'token/refresh', refreshToken)
  }

  getUserDetail(id: any, token: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.api + 'user/' + id, { headers: headers });

  }

  updateUser(id: any, user: UserModel, token: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(this.api + 'user/' + id, user, { headers: headers })
  }

  deleteUser(id: any, token: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(this.api + 'user/' + id, { headers: headers });
  }

  changePassword(id: any, userPassword: PasswordModel, token: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(this.api + 'change-password/' + id, userPassword, { headers: headers });
  }

}
