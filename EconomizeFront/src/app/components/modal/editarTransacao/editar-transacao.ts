import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Accounts } from 'src/app/models/accounts.model';
import { TokensService } from 'src/app/services/tokens.service';
import { TransationsService } from 'src/app/services/transations.service';

@Component({
    selector: 'ngbd-modal-editar-transacao',
    templateUrl: './editar-transacao.html',
    styleUrls: ['./editar-transacao.css'],
    // add NgbModalConfig and NgbModal to the component providers
    providers: [NgbModalConfig, NgbModal]
})
export class NgbdModalEditarTransacao {
    closeResult = '';

    constructor(config: NgbModalConfig, private modalService: NgbModal) {
        // customize default values of modals used by this component tree
        config.backdrop = true;
        config.keyboard = true;
    }

    open(content: any) {
        this.modalService.open(content);
    }



}