import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { requestResetModel } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'ngbd-modal-email',
    templateUrl: './reset-email.html',
    styleUrls: ['./reset-email.css'],
    // add NgbModalConfig and NgbModal to the component providers
    providers: [NgbModalConfig, NgbModal]
})
export class NgbdModalEmail {

    useremail: requestResetModel = new requestResetModel;

    closeResult = '';

    constructor(config: NgbModalConfig, private modalService: NgbModal, private auth: AuthenticationService) {
        // customize default values of modals used by this component tree
        config.backdrop = true;
        config.keyboard = true;
    }

    resetPassword() {
        console.log(this.useremail);
        this.auth.requestResetPassword(this.useremail).subscribe(() => {
            console.log('Enviamos um e-mail')
        }, err => {
            console.log('Erro ao enviar e-mail: ', err);
        })
    }

    open(content: any) {
        this.modalService.open(content);
    }
}