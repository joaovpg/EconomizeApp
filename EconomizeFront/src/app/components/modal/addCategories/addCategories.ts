import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Accounts } from 'src/app/models/accounts.model';
import { CategoriesModel } from 'src/app/models/categories.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
    selector: 'ngbd-modal-addCategories',
    templateUrl: './addCategories.html',
    styleUrls: ['./addCategories.css'],
    // add NgbModalConfig and NgbModal to the component providers
    providers: [NgbModalConfig, NgbModal]
})
export class NgbdModaladdCategories {
    category: CategoriesModel = new CategoriesModel();
    closeResult = '';

    constructor(config: NgbModalConfig, private modalService: NgbModal, private categories: CategoriesService) {
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

    createCategories() {
        this.categories.createCategory(this.category).subscribe(() => {
            console.log("Categoria criada com sucesso");
        }, erro => {
            console.log("Erro ao criar categoria: ", erro);
        });
        this.dismissaAll('');
        window.location.reload();
    }


}