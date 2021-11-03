import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: Observable<firebase.User | null>
  constructor(private auth: AngularFireAuth) { 
    this.user = this.auth.authState;
  }

  login(email: string, senha: string): Promise<firebase.auth.UserCredential>{
    return this.auth.signInWithEmailAndPassword(email, senha);
  }

  createUser(email: string, senha: string){
    return this.auth.createUserWithEmailAndPassword(email, senha);
  }

  logout(): Promise<void>{
    return this.auth.signOut();
  }
}
