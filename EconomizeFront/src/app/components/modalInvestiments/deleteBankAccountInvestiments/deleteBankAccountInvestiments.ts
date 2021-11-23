import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetSetService } from 'src/app/servicesInvestiments/getSet.service';
import { BankAccountsService } from 'src/app/servicesInvestiments/bankAccounts.service';

@Component({
    selector: 'ngbd-modal-deleteBankAccountInvestiments',
    templateUrl: './deleteBankAccountInvestiments.html',
    styleUrls: ['./deleteBankAccountInvestiments.css'],
    // add NgbModalConfig and NgbModal to the component providers
    providers: [NgbModalConfig, NgbModal]
})
export class NgbdModalDeleteBankAccountInvestiments {

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