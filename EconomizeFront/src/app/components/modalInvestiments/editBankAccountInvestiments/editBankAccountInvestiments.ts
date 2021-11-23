import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Accounts } from 'src/app/models/accounts.model';
import { GetSetService } from 'src/app/servicesInvestiments/getSet.service';
import { BankAccountsService } from 'src/app/servicesInvestiments/bankAccounts.service';

@Component({
    selector: 'ngbd-modal-editBankAccountInvestiments',
    templateUrl: './editBankAccountInvestiments.html',
    styleUrls: ['./editBankAccountInvestiments.css'],
    // add NgbModalConfig and NgbModal to the component providers
    providers: [NgbModalConfig, NgbModal]
})
export class NgbdModalEditBankAccountInvestiments implements OnInit {
    closeResult = '';
    account: Accounts = new Accounts();

    constructor(config: NgbModalConfig, private modalService: NgbModal, private getSet: GetSetService, private transation: BankAccountsService) {
        // customize default values of modals used by this component tree
        config.backdrop = true;
        config.keyboard = true;
    }

    ngOnInit() {
        this.getAccount();
    }

    open(content: any) {
        this.modalService.open(content);
    }

    dismissaAll(reason: any) {
        this.modalService.dismissAll(reason);
    }

    getAccount() {
        this.account = this.getSet.getAccount();
    }

    putAccount() {
        let id = this.getSet.getAccount().id;
        this.transation.updtAccount(id, this.account).subscribe(() => {
            console.log("Atualizado");
            this.dismissaAll('');
        }, erro => {
            console.log("Erro ao atualizar: ", erro);
        })
        window.location.reload();
    }
}