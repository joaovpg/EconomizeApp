import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetSetService } from 'src/app/services/getSet.service';
import { TransationsService } from 'src/app/services/transations.service';

@Component({
    selector: 'ngbd-modal-deleteTransation',
    templateUrl: './deleteTransation.html',
    styleUrls: ['./deleteTransation.css'],
    // add NgbModalConfig and NgbModal to the component providers
    providers: [NgbModalConfig, NgbModal]
})
export class NgbdModalDeleteTransation {

    closeResult = '';

    constructor(config: NgbModalConfig, private modalService: NgbModal, private transations: TransationsService, private getSet: GetSetService) {
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