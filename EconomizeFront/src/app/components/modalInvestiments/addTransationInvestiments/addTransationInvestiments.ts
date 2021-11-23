import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvestimentsModel } from 'src/app/models/investiments.model';
import { BankAccountsService } from 'src/app/servicesInvestiments/bankAccounts.service';
import { CategoriesService } from 'src/app/servicesInvestiments/categories.service';
import { GetSetService } from 'src/app/servicesInvestiments/getSet.service';
import { InvestimentService } from 'src/app/servicesInvestiments/investiments.service';

@Component({
    selector: 'ngbd-modal-addTransationInvestiments',
    templateUrl: './addTransationInvestiments.html',
    styleUrls: ['./addTransationInvestiments.css'],
    // add NgbModalConfig and NgbModal to the component providers
    providers: [NgbModalConfig, NgbModal]
})
export class NgbdModalAddTransationInvestiments implements OnInit {

    userId = this.getSet.getId();
    accountArray: Array<any> = new Array();
    categoryArray: Array<any> = new Array();
    transationModel: InvestimentsModel = new InvestimentsModel();
    closeResult = '';

    constructor(config: NgbModalConfig, private modalService: NgbModal, private transation: InvestimentService, private account: BankAccountsService, private categories: CategoriesService, private getSet: GetSetService) {
        // customize default values of modals used by this component tree
        config.backdrop = true;
        config.keyboard = true;
    }

    ngOnInit() {
        this.getAccounts();
        this.getCategories();
    }

    open(content: any) {
        this.modalService.open(content);
    }

    createTransation() {
        this.transationModel.idUsuario = this.userId;
        console.log("transação: ", this.transationModel);
        this.transation.createTransation(this.transationModel).subscribe(() => {
            console.log("Criado com sucesso");
        }, erro => {
            console.log("Erro ao criar: ", erro);
        })
        window.location.reload();
        this.dismissaAll('');
    }

    getAccounts() {
        this.account.getAccounts().subscribe((accounts: any) => {
            this.accountArray = accounts;
            console.log(this.accountArray);
        }, err => {
            console.log("Erro ao listar: ", err);
        })
    }


    getCategories() {
        this.categories.getCategories().subscribe((categories: any) => {
            this.categoryArray = categories;
            console.log("Categorias listadas");
        }, erro => {
            console.log("Erro ao listar: ", erro);
        })
    }

    dismissaAll(reason: any) {
        this.modalService.dismissAll(reason);
    }
}