import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransationsModel } from 'src/app/models/transations.model';
import { BankAccountsService } from 'src/app/services/bankAccounts.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { TransationsService } from 'src/app/services/transations.service';

@Component({
    selector: 'ngbd-modal-addTransation',
    templateUrl: './addTransation.html',
    styleUrls: ['./addTransation.css'],
    // add NgbModalConfig and NgbModal to the component providers
    providers: [NgbModalConfig, NgbModal]
})
export class NgbdModalAddTransation implements OnInit {

    accountArray: Array<any> = new Array();
    categoryArray: Array<any> = new Array();
    transationModel: TransationsModel = new TransationsModel();
    closeResult = '';

    constructor(config: NgbModalConfig, private modalService: NgbModal, private transation: TransationsService, private account: BankAccountsService, private categories: CategoriesService) {
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

    getAccounts() {
        this.account.getAccounts().subscribe((accounts: any) => {
            this.accountArray = accounts;
            console.log(this.accountArray);
        }, err => {
            console.log("Erro ao listar: ", err);
        })
    }

    createTransation() {
        this.transation.createTransation(this.transationModel).subscribe(() => {
            console.log("Criado com sucesso");
        }, erro => {
            console.log("Erro ao criar: ", erro);
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
}