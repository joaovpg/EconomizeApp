import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Accounts } from 'src/app/models/accounts.model';
import { TransationsService } from 'src/app/services/transations.service';


@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.css']
})
export class TransacoesComponent implements OnInit {

  data: any;
  chartOptions: any;
  subscription!: Subscription;
  basicOptions: any;

  constructor(private transations: TransationsService) { }

  account: Array<any> = new Array();

  ngOnInit(): void {

    this.getContas();

    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "#42A5F5",
            "#66BB6A",
            "#FFA726"
          ],
          hoverBackgroundColor: [
            "#64B5F6",
            "#81C784",
            "#FFB74D"
          ]
        }
      ]
    };
  }


  getContas() {
    this.transations.getAccounts().subscribe((accounts: any) => {
      this.account = accounts;
      console.log(this.account);
    }, err => {
      console.log("Erro ao listar: ", err);
    })
  }

}
