import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesModel } from 'src/app/models/categories.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { GetSetService } from 'src/app/services/getSet.service';

@Component({
    selector: 'ngbd-modal-editCategories',
    templateUrl: './editCategories.html',
    styleUrls: ['./editCategories.css'],
    // add NgbModalConfig and NgbModal to the component providers
    providers: [NgbModalConfig, NgbModal]
})
export class NgbdModaleditCategories implements OnInit {
    categoryModel: CategoriesModel = new CategoriesModel();
    closeResult = '';

    constructor(config: NgbModalConfig, private modalService: NgbModal, private categories: CategoriesService, private getSet: GetSetService) {
        // customize default values of modals used by this component tree
        config.backdrop = true;
        config.keyboard = true;
    }

    ngOnInit() {
        this.getCategoryDetail();
    }

    open(content: any) {
        this.modalService.open(content);
    }

    dismissaAll(reason: any) {
        this.modalService.dismissAll(reason);
    }

    getCategoryDetail() {
        this.categoryModel = this.getSet.getCategory();
    }

    updateCategory() {
        let id = this.getSet.getCategory().id;
        console.log(id);
        this.categories.updateCategory(id, this.categoryModel).subscribe(() => {
            console.log("Categoria atualizada com sucesso");
        }, erro => {
            console.log("Erro ao criar categoria: ", erro);
        });
        this.dismissaAll('');
        window.location.reload();
    }


}