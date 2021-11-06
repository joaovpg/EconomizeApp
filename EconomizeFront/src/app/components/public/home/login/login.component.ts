import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserLogin = new UserLogin;

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  requestLogin() {
    this.auth.loginUser(this.user).subscribe(
      // Retorno do método post com o usuário
      user => {
        console.log("Response: ", user);
        this.user = user;
      },
      // Retorna o erro, caso tenha
      err => {
        console.log("Erro ao logar: ", err);
        alert("Erro ao logar: " + err);
      },
      // Retorna o sucesso.
      () => {
        alert("Usuário logado com sucesso");
        this.router.navigate(['perfil/' + this.user.id]);
      })
  }


}
