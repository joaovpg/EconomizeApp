import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetSetService } from 'src/app/services/getSet.service';
import { BankAccountsService } from 'src/app/services/bankAccounts.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
    selector: 'ngbd-modal-deleteCategories',
    templateUrl: './deleteCategories.html',
    styleUrls: ['./deleteCategories.css'],
    // add NgbModalConfig and NgbModal to the component providers
    providers: [NgbModalConfig, NgbModal]
})
export class NgbdModalDeleteCategories {

    closeResult = '';

    constructor(config: NgbModalConfig, private modalService: NgbModal, private getSet: GetSetService, private categories: CategoriesService) {
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

    deleteCategory() {
        let id = this.getSet.getCategory().id;

        this.categories.deleteCategory(id).subscribe(() => {
            console.log("Deletado com sucesso");
            this.dismissaAll('');
        }, erro => {
            console.log("Erro ao deletar: ", erro);
        })

        window.location.reload();
    }
}