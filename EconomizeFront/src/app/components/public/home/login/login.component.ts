import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorDetail, UserModel } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  user: UserModel = new UserModel;
  erro: ErrorDetail = new ErrorDetail;

  constructor(private auth: AuthenticationService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  requestLogin() {
    this.auth.loginUser(this.user)

      .subscribe(
        // Retorno do método post com o usuário
        user => {
          console.log("Response: ", user);
          this.user = user;
        },
        // Retorna o erro, caso tenha
        (response: HttpErrorResponse) => {
          this.erro = response.error;
          console.log("ERROR: ", this.erro.detail);
          console.log("Erro ao logar: ", this.erro.detail);

          if ((this.erro.password != undefined) && (this.erro.useremail != undefined)) {
            this.message("E-mail: " + this.erro.password);
            this.message("Senha: " + this.erro.useremail);
          } else if (this.erro.detail != undefined) {
            this.message(this.erro.detail);
          } else if (this.erro.useremail != undefined) {
            this.message("E-mail: " + this.erro.useremail);
          } else if (this.erro.password != undefined) {
            this.message("Senha: " + this.erro.password);
          }

        },
        // Retorna o sucesso.
        () => {
          this.router.navigate(['perfil/' + this.user.id]);
        })
  }

  // Função que ativa o toast
  message(error: any) {
    this.messageService.add({ severity: 'error', summary: 'Erro ao logar', detail: error });
  }

}
