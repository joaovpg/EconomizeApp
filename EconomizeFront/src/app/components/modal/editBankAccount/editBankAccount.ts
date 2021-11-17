import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Accounts } from 'src/app/models/accounts.model';
import { TransationsService } from 'src/app/services/transations.service';

@Component({
    selector: 'ngbd-modal-editBankAccount',
    templateUrl: './editBankAccount.html',
    styleUrls: ['./editBankAccount.css'],
    // add NgbModalConfig and NgbModal to the component providers
    providers: [NgbModalConfig, NgbModal]
})
export class NgbdModalEditBankAccount {
    accounts: Accounts = new Accounts
    closeResult = '';

    constructor(config: NgbModalConfig, private modalService: NgbModal, private transation: TransationsService) {
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

    editAccount() {
        this.transation.updtAccounts(id, this.accounts).subscribe(()=>{
            console.log("Atualizado com sucesso");
        },error =>{
            console.log("Erro ao atualizar",error);
        })
    }

}