import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetSetService } from 'src/app/services/getSet.service';
import { TransationsService } from 'src/app/services/transations.service';


@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.css']
})
export class TransacoesComponent implements OnInit {

  constructor(private transations: TransationsService, private getSet: GetSetService) { }
  data: any;
  chartOptions: any;
  subscription!: Subscription;
  basicOptions: any;
  account: Array<any> = new Array();
  total: any;

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
      this.total += accounts;
      console.log(this.account);
    }, err => {
      console.log("Erro ao listar: ", err);
    })
  }

  getAccount(id: any) {
    console.log("Elemento filho: ", id);

    this.transations.getAccountDetail(id).subscribe((account: any) => {
      console.log("Conta: ", account)
      this.getSet.setAccount(account);
      console.log("Teste conta", this.getSet.getAccount());
    }, erro => {
      console.log("Erro ao listar: ", erro);
    })

  }

}
