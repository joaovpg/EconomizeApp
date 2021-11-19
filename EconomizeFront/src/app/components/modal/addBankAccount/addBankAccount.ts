import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Accounts } from 'src/app/models/accounts.model';
import { BankAccountsService } from 'src/app/services/bankAccounts.service';

@Component({
    selector: 'ngbd-modal-addBankAccount',
    templateUrl: './addBankAccount.html',
    styleUrls: ['./addBankAccount.css'],
    // add NgbModalConfig and NgbModal to the component providers
    providers: [NgbModalConfig, NgbModal]
})
export class NgbdModalAddBankAccount {
    accounts: Accounts = new Accounts
    closeResult = '';

    constructor(config: NgbModalConfig, private modalService: NgbModal, private transation: BankAccountsService) {
        // customize default values of modals used by this component tree
        config.backdrop = true;
        config.keyboard = true;
    }

    open(content: any) {
        this.modalService.open(content);
    }

    dismissaAll(reason: any) {
        this.modalService.dismissAll(reason);
    }

    createBankAccount() {
        this.transation.createAccounts(this.accounts).subscribe(() => {
            console.log("Conta criada com sucesso: ", this.accounts);
            this.dismissaAll('');
            window.location.reload();
        }, err => {
            console.log("Erro ao criar conta: ", err);
        })
    }
}