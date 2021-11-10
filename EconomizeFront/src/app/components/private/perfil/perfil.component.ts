import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel, passwordModel } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user: UserModel = new UserModel;
  password: passwordModel = new passwordModel;
  confirmPassword: any;
  id = this.route.snapshot.paramMap.get('id');

  constructor(private auth: AuthenticationService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.listUserData();
  }

  listUserData() {
    this.auth.getUserDetail(this.id).subscribe(
      (user) => {
        this.user = user;
      },
      err => {
        console.log('Erro ao listar: ', err);
      })
  }

  updateUserData() {
    this.auth.updateUser(this.id, this.user).subscribe(
      () => {
        alert("Usuário atualizado com sucesso");
        this.listUserData();
        console.log(this.user);
      }, err => {
        console.log("Erro ao atualizar usuário: ", err);
      })
  }

  changeUserPassword() {
    console.log(this.confirmPassword);
    console.log(this.password.new_password);
    if (this.confirmPassword == this.password.new_password) {
      this.auth.changePassword(this.id, this.password).subscribe(
        (userPassword) => {
          this.password = userPassword;
        }, err => {
          console.log(this.password);
          console.log("Erro ao atualizar senha: ", err);
        }, () => {
          alert("Senha atualizada com sucesso");
          console.log(this.password);
        }
      );
    } else {
      alert("Confirmação da senha está errada");
    }
  }
}
