import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user: UserModel = new UserModel;
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
}
