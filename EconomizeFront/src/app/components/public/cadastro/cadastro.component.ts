import { Component, OnInit } from '@angular/core';
import { faGooglePlus } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  faGooglePlus = faGooglePlus;
  faFacebook = faFacebook;

  constructor() { }

  ngOnInit(): void {
  }

}
