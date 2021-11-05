import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http'
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  api = "http://127.0.0.1:8000/auth/create-user/";
  user: Observable<firebase.User | null>

  constructor(private auth: AngularFireAuth, private http: HttpClient) {
    this.user = this.auth.authState;
  }

  login(email: string, senha: string): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, senha);
  }

  createUser(usuario: UserModel): Observable<any> {
    return this.http.post(this.api, usuario);
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }


}
