import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { timer } from 'rxjs';
import { Accounts } from 'src/app/models/accounts.model';
import { TokensService } from 'src/app/services/tokens.service';
import { TransationsService } from 'src/app/services/transations.service';

@Component({
    selector: 'ngbd-modal-editBankAccount',
    templateUrl: './editBankAccount.html',
    styleUrls: ['./editBankAccount.css'],
    // add NgbModalConfig and NgbModal to the component providers
    providers: [NgbModalConfig, NgbModal]
})
export class NgbdModalEditBankAccount {
    closeResult = '';
    account: Accounts = new Accounts();

    constructor(config: NgbModalConfig, private modalService: NgbModal, private getSet: TokensService, private transation: TransationsService) {
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

    getAccount() {
        let id = this.getSet.getIdAccount();
        this.transation.getAccountDetail(id).subscribe((account: any) => {
            console.log("Conta: ", this.account)
            this.account = account;
        }, erro => {
            console.log("Erro ao listar: ", erro);
        })

    }

    putAccount() {
        let id = this.getSet.getIdAccount();;
        this.transation.updtAccount(id, this.account).subscribe(() => {
            console.log("Atualizado");
        }, erro => {
            console.log("Erro ao atualizar: ", erro);
        })
        this.dismissaAll('');
        window.location.reload();
    }

}