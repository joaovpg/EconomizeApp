import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http'
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


  logout(): Promise<void> {
    return this.auth.signOut();
  }

  getUserDetail(id: any): Observable<any> {
    return this.http.get(this.api + 'user/' + id)
  }

  updateUser(id: any, user: UserModel): Observable<any> {
    return this.http.put(this.api + 'user/' + id, user)
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(this.api + 'user/' + id);
  }

  changePassword(id: any, userPassword: PasswordModel): Observable<any> {
    return this.http.put(this.api + 'change-password/' + id, userPassword);
  }

}
