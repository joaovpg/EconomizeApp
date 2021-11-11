import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  user: UserModel = new UserModel;

  constructor(private auth: AuthenticationService, private router: Router, private messageService: MessageService) { }

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
        // alert("Erro ao logar: " + err);
        this.message(err);
      },
      // Retorna o sucesso.
      () => {
        alert("Usuário logado com sucesso");
        this.router.navigate(['perfil/' + this.user.id]);
      })
  }

  // Função que ativa o toast
  message(error: any) {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: error });
  }

}
