import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetSetService } from 'src/app/services/getSet.service';
import { BankAccountsService } from 'src/app/services/bankAccounts.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { CategoriesModel } from 'src/app/models/categories.model';


@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.css']
})
export class TransacoesComponent implements OnInit {

  constructor(private transations: BankAccountsService, private categories: CategoriesService, private getSet: GetSetService) { }
  data: any;
  chartOptions: any;
  subscription!: Subscription;
  basicOptions: any;
  account: Array<any> = new Array();
  category: Array<any> = new Array();
  total: any;

  ngOnInit(): void {

    this.getContas();
    this.getCategories();

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
    this.transations.getAccountDetail(id).subscribe((account: any) => {
      console.log("Conta: ", account)
      this.getSet.setAccount(account);
      console.log("Teste conta", this.getSet.getAccount());
    }, erro => {
      console.log("Erro ao listar: ", erro);
    })
  }

  getCategory(id: any) {
    this.categories.getCategoryDetail(id).subscribe((category: any) => {
      console.log("Categoria: ", category)
      this.getSet.setCategory(category);
      console.log("Teste categoria", this.getSet.getCategory());
    }, erro => {
      console.log("Erro ao listar: ", erro);
    })
  }

  getCategories() {
    this.categories.getCategories().subscribe((categories: any) => {
      this.category = categories;
      console.log("Categorias listadas");
    }, erro => {
      console.log("Erro ao listar: ", erro);
    })
  }



}
