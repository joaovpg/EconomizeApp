import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetSetService } from 'src/app/servicesInvestiments/getSet.service';
import { BankAccountsService } from 'src/app/servicesInvestiments/bankAccounts.service';
import { CategoriesService } from 'src/app/servicesInvestiments/categories.service';

@Component({
    selector: 'ngbd-modal-deleteCategoriesInvestiments',
    templateUrl: './deleteCategoriesInvestiments.html',
    styleUrls: ['./deleteCategoriesInvestiments.css'],
    // add NgbModalConfig and NgbModal to the component providers
    providers: [NgbModalConfig, NgbModal]
})
export class NgbdModalDeleteCategoriesInvestiments {

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