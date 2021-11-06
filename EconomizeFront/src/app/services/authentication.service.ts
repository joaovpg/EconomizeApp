import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http'
import { UserModel, UserLogin } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  api = "http://127.0.0.1:8000/auth/";
  user: Observable<firebase.User | null>

  constructor(private auth: AngularFireAuth, private http: HttpClient) {
    this.user = this.auth.authState;
  }

  loginUser(userLogin: UserLogin): Observable<any> {
    return this.http.post(this.api + 'login/', userLogin);
  }

  createUser(user: UserModel): Observable<any> {
    return this.http.post(this.api + 'create-user/', user);
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }


}
