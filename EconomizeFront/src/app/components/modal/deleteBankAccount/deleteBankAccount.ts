import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokensService } from 'src/app/services/tokens.service';
import { TransationsService } from 'src/app/services/transations.service';

@Component({
    selector: 'ngbd-modal-deleteBankAccount',
    templateUrl: './deleteBankAccount.html',
    styleUrls: ['./deleteBankAccount.css'],
    // add NgbModalConfig and NgbModal to the component providers
    providers: [NgbModalConfig, NgbModal]
})
export class NgbdModalDeleteBankAccount {

    closeResult = '';

    constructor(config: NgbModalConfig, private modalService: NgbModal, private getSet: TokensService, private transation: TransationsService) {
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
        let id = this.getSet.getIdAccount();
        this.transation.deleteAccount(id).subscribe(() => {
            console.log("Deletado com sucesso");
        }, erro => {
            console.log("Erro ao deletar: ", erro);
        })
        this.dismissaAll('');
        window.location.reload();
    }
}