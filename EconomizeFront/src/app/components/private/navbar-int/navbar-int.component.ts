import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar-int',
  templateUrl: './navbar-int.component.html',
  styleUrls: ['./navbar-int.component.css']
})
export class NavbarIntComponent implements OnInit {

  constructor(private authServ: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  sair(){
    this.authServ.logout().then(()=> {
      this.router.navigate(['/home']);
    });
  }
}
