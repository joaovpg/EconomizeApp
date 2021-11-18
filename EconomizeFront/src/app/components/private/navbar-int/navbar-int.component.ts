import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GetSetService } from 'src/app/services/getSet.service';

@Component({
  selector: 'app-navbar-int',
  templateUrl: './navbar-int.component.html',
  styleUrls: ['./navbar-int.component.css']
})
export class NavbarIntComponent implements OnInit {

  id = this.getSet.getId();
  token = this.getSet.getRefreshToken();
  refreshToken = {
    refresh: this.token,
  }



  constructor(private auth: AuthenticationService, private router: Router, private getSet: GetSetService) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logoutUser(this.refreshToken).subscribe(() => {
      console.log("Usuário deslogado");
      this.getSet.setAccessToken(undefined);
      this.getSet.setId(undefined);
      this.router.navigate(['/home']);
    }, err => {
      console.log('Erro ao logar: ', err);
    })
  }
}
