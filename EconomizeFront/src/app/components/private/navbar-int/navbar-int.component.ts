import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokensService } from 'src/app/services/tokens.service';

@Component({
  selector: 'app-navbar-int',
  templateUrl: './navbar-int.component.html',
  styleUrls: ['./navbar-int.component.css']
})
export class NavbarIntComponent implements OnInit {

  id = this.getSet.getId();
  constructor(private authServ: AuthenticationService, private router: Router, private getSet: TokensService) { }

  ngOnInit(): void {
  }

  sair() {
    this.authServ.logout().then(() => {
      this.router.navigate(['/home']);
    });
  }
}
