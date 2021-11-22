import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransationsModel } from 'src/app/models/transations.model';
import { BankAccountsService } from 'src/app/services/bankAccounts.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { GetSetService } from 'src/app/services/getSet.service';
import { TransationsService } from 'src/app/services/transations.service';

@Component({
    selector: 'ngbd-modal-editTransation',
    templateUrl: './editTransation.html',
    styleUrls: ['./editTransation.css'],
    // add NgbModalConfig and NgbModal to the component providers
    providers: [NgbModalConfig, NgbModal]
})
export class NgbdModalEditTransation implements OnInit {
    closeResult = '';
    transation: TransationsModel = new TransationsModel();
    accountArray: Array<any> = new Array();
    categoryArray: Array<any> = new Array();

    constructor(config: NgbModalConfig, private modalService: NgbModal, private getSet: GetSetService, private transations: TransationsService, private account: BankAccountsService, private categories: CategoriesService) {
        // customize default values of modals used by this component tree
        config.backdrop = true;
        config.keyboard = true;
    }

    ngOnInit() {
        this.getTransation();
        this.getAccounts();
        this.getCategories();
    }

    open(content: any) {
        this.modalService.open(content);
    }

    dismissaAll(reason: any) {
        this.modalService.dismissAll(reason);
    }

    getTransation() {
        this.transation = this.getSet.getTransation();
    }

    putTransation() {
        let id = this.getSet.getTransation().id;
        this.transations.updateTransation(id, this.transation).subscribe((transations) => {
            console.log("Atualizado: ", transations);

        }, erro => {
            console.log("Erro ao atualizar: ", erro);
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




}