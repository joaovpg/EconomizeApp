import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetSetService } from 'src/app/servicesInvestiments/getSet.service';
import { InvestimentService } from 'src/app/servicesInvestiments/investiments.service';

@Component({
    selector: 'ngbd-modal-deleteTransationInvestiments',
    templateUrl: './deleteTransationInvestiments.html',
    styleUrls: ['./deleteTransationInvestiments.css'],
    // add NgbModalConfig and NgbModal to the component providers
    providers: [NgbModalConfig, NgbModal]
})
export class NgbdModalDeleteTransationInvestiments {

    closeResult = '';

    constructor(config: NgbModalConfig, private modalService: NgbModal, private transations: InvestimentService, private getSet: GetSetService) {
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

    deleteTransation() {
        let id = this.getSet.getTransation().id;

        this.transations.deleteTransation(id).subscribe(() => {
            console.log("Deletado com sucesso");
        }, erro => {
            console.log("Erro ao deletar: ", erro);
        })
        this.dismissaAll('');
        window.location.reload();
    }
}