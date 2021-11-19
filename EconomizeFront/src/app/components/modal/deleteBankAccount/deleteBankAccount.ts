import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetSetService } from 'src/app/services/getSet.service';
import { BankAccountsService } from 'src/app/services/bankAccounts.service';

@Component({
    selector: 'ngbd-modal-deleteBankAccount',
    templateUrl: './deleteBankAccount.html',
    styleUrls: ['./deleteBankAccount.css'],
    // add NgbModalConfig and NgbModal to the component providers
    providers: [NgbModalConfig, NgbModal]
})
export class NgbdModalDeleteBankAccount {

    closeResult = '';

    constructor(config: NgbModalConfig, private modalService: NgbModal, private getSet: GetSetService, private transation: BankAccountsService) {
        // customize default values of modals used by this component tree
        config.backdrop = true;
        config.keyboard = true;
    }

    open(content: any) {
        this.modalService.open(content, { size: 'lg' });
    }

    dismissaAll(reason: any) {
        this.modalService.dismissAll(reason);
    }

    deleteAccount() {
        let id = this.getSet.getAccount().id;

        this.transation.deleteAccount(id).subscribe(() => {
            console.log("Deletado com sucesso");
            this.dismissaAll('');
        }, erro => {
            console.log("Erro ao deletar: ", erro);
        })

        window.location.reload();
    }
}