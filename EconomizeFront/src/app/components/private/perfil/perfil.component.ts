import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModel, PasswordModel, ErrorDetail } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { GetSetService } from 'src/app/services/getSet.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [MessageService]
})
export class PerfilComponent implements OnInit {
  user: UserModel = new UserModel;
  password: PasswordModel = new PasswordModel;
  erro: ErrorDetail = new ErrorDetail;
  confirmPassword: any;
  id = this.route.snapshot.paramMap.get('id');
  tokenAccess = this.token.getAccessToken();


  constructor(private auth: AuthenticationService, private route: ActivatedRoute, private messageService: MessageService, private token: GetSetService) { }


  ngOnInit(): void {
    if (this.token.getAccessToken != undefined || this.token.getAccessToken != null) {
      this.listUserData();
    } else {
      window.location.reload();
    }
  }

  listUserData() {
    this.auth.getUserDetail(this.id).subscribe(
      (user) => {
        this.user = user;
      },
      err => {
        this.messageError('Erro ao listar: ' + err);
        console.log(this.tokenAccess);
      })
  }

  updateUserData() {
    this.auth.updateUser(this.id, this.user).subscribe(
      () => {
        this.messageSuccess("Usuário atualizado com sucesso");
        this.listUserData();
        console.log(this.user);
      }, err => {
        this.messageError("Erro ao atualizar usuário: " + err);
      })
  }

  changeUserPassword() {
    console.log(this.confirmPassword);
    console.log(this.password.new_password);
    if (this.confirmPassword == this.password.new_password) {
      this.auth.changePassword(this.id, this.password).subscribe(
        (userPassword) => {
          this.password = userPassword;
        }, (response: HttpErrorResponse) => {
          this.erro = response.error;
          if ((this.erro.old_password) != undefined) {
            this.messageError("Senha atual: " + this.erro.old_password);
          } else if ((this.erro.new_password) != undefined) {
            this.messageError("Nova senha: " + this.erro.new_password);
          }
        }, () => {
          this.messageSuccess("Senha atualizada com sucesso");
        }
      );
    } else {
      this.messageError("As senhas não são iguais");
    }
  }

  messageError(message: any) {
    this.messageService.add({ severity: 'error', summary: 'Erro ao alterar senha', detail: message });
  }

  messageSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: message, detail: '' });
  }
}
