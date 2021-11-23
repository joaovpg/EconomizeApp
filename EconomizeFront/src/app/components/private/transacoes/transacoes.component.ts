import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetSetService } from 'src/app/services/getSet.service';
import { BankAccountsService } from 'src/app/services/bankAccounts.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { TransationsService } from 'src/app/services/transations.service';


@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.css']
})
export class TransacoesComponent implements OnInit {

  curdate = new Date().getFullYear().toString() + '-' + (new Date().getMonth() + 1).toString();

  year = this.curdate.slice(0, 4);
  month = this.curdate.slice(5, 7);

  constructor(private transations: TransationsService, private accounts: BankAccountsService, private categories: CategoriesService, private getSet: GetSetService) { }

  labels: any;
  dataLinear: any;
  dataPizza: any;
  chartOptions: any;
  subscription!: Subscription;
  basicOptions: any;
  transation: Array<any> = new Array();
  account: Array<any> = new Array();
  category: Array<any> = new Array();
  receitas: Array<any> = new Array();
  despesas: Array<any> = new Array();
  categoriesArray: Array<any> = new Array();
  colorsArray: Array<any> = new Array();
  categoriesArrayId: Array<any> = new Array();
  totalDespesa = 0;
  totalReceita = 0;
  valorTotal = 0;
  color!: string;
  ArrayCategory: Array<any> = new Array();
  categoryTotal: Array<any> = new Array();
  totalCategoria: any;
  valorTotalCategoria: Array<any> = new Array();

  ngOnInit(): void {
    this.valorTotal = 0;
    this.setDate();
    this.getTransations();
    this.getAccounts();
    this.getCategories();
    this.getTotais();

    this.dataLinear = {
      labels: ['01-11-2021', '12-11-2021', '21-11-2021', '22-11-2021'],
      datasets: [
        {
          data: [3000, 2900, 2900 - 10 + 3 + 100, 1000],
          backgroundColor: [
            "#42A5F5"
          ],
          hoverBackgroundColor: [
            "#64B5F6"
          ]
        }
      ]
    };

  }

  setDate() {
    console.log('Data atual: ', this.curdate);
  }

  getTransations() {
    this.transations.getTransations(this.year, this.month).subscribe((transations: any) => {
      console.log("Transações listadas");
      this.transation = transations;
    }, error => {
      console.log("Erro ao listar: ", error);
    })
  }


  getAccounts() {
    this.accounts.getAccounts().subscribe((accounts: any) => {
      this.account = accounts;
      console.log(this.account);
    }, err => {
      console.log("Erro ao listar: ", err);
    })
  }

  getCategories() {
    this.categories.getCategories().subscribe((categories: any) => {
      this.category = categories;
      console.log("Categorias listadas");

      let length = this.category.length;
      this.categoriesArray = [];

      for (let i = 0; i < length; i++) {

        this.transations.getTotalCategory(this.category[i].id, this.year, this.month).subscribe((categoria: any) => {
          this.ArrayCategory = categoria;

          let length = this.despesas.length;
          var totalCategoria = 0

          for (let i = 0; i < length; i++) {
            totalCategoria += Number(this.ArrayCategory[i].valor);
          }
          console.log('aaaa ' + totalCategoria);

          this.totalCategoria[i] = totalCategoria;
        })


        this.categoriesArray[i] = this.category[i].tipo;
        this.colorsArray[i] = this.getRandomColor();
      }


      this.createGraph(this.categoriesArray, this.colorsArray, this.getValorTotalCategoria());

    }, erro => {
      console.log("Erro ao listar: ", erro);
    })
  }

  getTransation(id: any) {
    this.transations.getTransationDetail(id).subscribe((transation: any) => {
      this.getSet.setTransation(transation);
    }, error => {
      console.log("Erro ao listar: ", error);
    })
  }

  getAccount(id: any) {
    this.accounts.getAccountDetail(id).subscribe((account: any) => {
      this.getSet.setAccount(account);
    }, erro => {
      console.log("Erro ao listar: ", erro);
    })
  }

  getCategory(id: any) {
    this.categories.getCategoryDetail(id).subscribe((category: any) => {
      this.getSet.setCategory(category);
    }, erro => {
      console.log("Erro ao listar: ", erro);
    })
  }

  getValue(event: any) {
    let newValue = event.target.value;
    this.curdate = newValue;
    this.year = this.curdate.slice(0, 4);
    this.month = this.curdate.slice(5, 7);

    this.valorTotal = 0;
    return this.getTransations(), this.getTotais();
  }

  getTotais() {
    this.transations.getTotal('Receita', this.year, this.month).subscribe((receitas: any) => {
      this.receitas = receitas;
      console.log(receitas);

      let length = this.receitas.length;
      let totalReceita = 0;

      for (let i = 0; i < length; i++) {
        totalReceita += Number(this.receitas[i].valor);
      }
      this.totalReceita = totalReceita;

      this.valorTotal += totalReceita;
    })

    this.transations.getTotal('Despesa', this.year, this.month).subscribe((despesas: any) => {
      this.despesas = despesas;

      let length = this.despesas.length;
      let totalDespesa = 0;

      for (let i = 0; i < length; i++) {
        totalDespesa += Number(this.despesas[i].valor);
      }
      this.totalDespesa = totalDespesa;
      this.valorTotal -= totalDespesa;
    })
  }

  createGraph(labels: any, colors: any, total: any) {
    this.dataPizza = {
      labels: labels,
      datasets: [
        {
          data: total,
          backgroundColor: colors,
        }
      ]
    };
  }

  getRandomColor() {
    let letters = '0123456789ABCDEF';
    this.color = '#'
    for (var i = 0; i < 6; i++) {
      this.color += letters[Math.floor(Math.random() * 16)];
    }
    return this.color;
  }

  setValorTotalCategoria(valorTotal: any) {
    this.valorTotalCategoria.push(valorTotal);
    console.log("teste", this.valorTotalCategoria);
  }

  getValorTotalCategoria() {
    console.log("teste", this.valorTotalCategoria);
    return this.valorTotalCategoria;
  }

}


