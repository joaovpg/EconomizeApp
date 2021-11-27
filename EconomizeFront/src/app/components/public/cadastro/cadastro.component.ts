import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGooglePlus } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { MessageService } from 'primeng/api';
import { UserModel } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [MessageService]
})
export class CadastroComponent implements OnInit {
  // Modelo do usuário
  user: UserModel = new UserModel();
  // Captura a confirmação da senha
  passwordValidate: any;

  constructor(private auth: AuthenticationService, private route: Router, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  createUser() {
    console.log(this.user);
    // Confere se as senhas são iguais
    if (this.passwordValidate == this.user.password) {

      // Envia a requisição POST através do método createUser
      this.auth.createUser(this.user).subscribe(
        () => {
          alert("Usuário cadastrado com sucesso");
          this.voltar();
        }, err => {
          console.log("Erro ao cadastrar: ", err)
        })

    } else {
      this.messageError("Senhas não conferem");
    }
  }

  voltar() {
    return this.route.navigate(['/home']);
  }

  messageError(message: any) {
    this.messageService.add({ severity: 'error', summary: 'Erro ao criar usuário', detail: message });
  }

  messageSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: message, detail: '' });
  }

}
