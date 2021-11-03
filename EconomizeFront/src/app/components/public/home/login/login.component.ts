import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email!: string;
  senha!: string;

  constructor(private authServ: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  logar(){
    this.authServ.login(this.email, this.senha).then(() => {
      this.router.navigate(['/perfil']);
    })
  }


}
