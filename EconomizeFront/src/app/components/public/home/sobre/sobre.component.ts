import { Component, OnInit } from '@angular/core';
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css']
})
export class SobreComponent implements OnInit {
  faInstagramSquare = faInstagramSquare;
  faLinkedin = faLinkedin;
  faGithubSquare = faGithubSquare;
  
  constructor() { }

  ngOnInit(): void {
  }

}
