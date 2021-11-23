import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarExtComponent } from './components/public/navbar-ext/navbar-ext.component';
import { HomeComponent } from './components/public/home/home.component';
import { CadastroComponent } from './components/public/cadastro/cadastro.component';
import { RodapeComponent } from './components/public/rodape/rodape.component';
import { HeroComponent } from './components/public/home/hero/hero.component';
import { LoginComponent } from './components/public/home/login/login.component';
import { SobreComponent } from './components/public/home/sobre/sobre.component';
import { PerfilComponent } from './components/private/perfil/perfil.component';
import { NavbarIntComponent } from './components/private/navbar-int/navbar-int.component';
import { TransacoesComponent } from './components/private/transacoes/transacoes.component';
import { InvestimentosComponent } from './components/private/investimentos/investimentos.component';

// Bibliotecas
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

// import { AuthguardService } from './services/authguard.service';
import { UserNotAuthComponent } from './components/public/user-not-auth/user-not-auth.component';
import { ChartModule } from 'primeng/chart';
import { ToastModule } from 'primeng/toast';
import { NgbModal, NgbModalConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Modais
import { NgbdModalEmail } from './components/modal/resetEmail/reset-email';
import { NgbdModalExcluirConta } from './components/modal/excluirConta/excluir-conta';
import { NgbdModalDeleteTransation } from './components/modal/deleteTransation/deleteTransation';
import { NgbdModalEditTransation } from './components/modal/editTransation/editTransation';
import { NgbdModalAddTransation } from './components/modal/addTransation/addTransation';
import { NgbdModalAddBankAccount } from './components/modal/addBankAccount/addBankAccount';
import { NgbdModalEditBankAccount } from './components/modal/editBankAccount/editBankAccount';
import { NgbdModalDeleteBankAccount } from './components/modal/deleteBankAccount/deleteBankAccount';
import { NgbdModaladdCategories } from './components/modal/addCategories/addCategories';
import { NgbdModaleditCategories } from './components/modal/editCategories/editCategories';
import { NgbdModalDeleteCategories } from './components/modal/deleteCategories/deleteCategories';

import { BtnActionsComponent } from './components/private/btn-actions/btn-actions.component';
import { NgbdModalAddTransationInvestiments } from './components/modalInvestiments/addTransationInvestiments/addTransationInvestiments';
import { NgbdModalAddBankAccountInvestiments } from './components/modalInvestiments/addBankAccountInvestiments/addBankAccountInvestiments';
import { NgbdModaladdCategoriesInvestiments } from './components/modalInvestiments/addCategoriesInvestiments/addCategoriesInvestiments';
import { NgbdModalEditTransationInvestiments } from './components/modalInvestiments/editTransationInvestiments/editTransationInvestiments';
import { NgbdModalEditBankAccountInvestiments } from './components/modalInvestiments/editBankAccountInvestiments/editBankAccountInvestiments';
import { NgbdModaleditCategoriesInvestiments } from './components/modalInvestiments/editCategoriesInvestiments/editCategoriesInvestiments';
import { NgbdModalDeleteTransationInvestiments } from './components/modalInvestiments/deleteTransationInvestiments/deleteTransationInvestiments';
import { NgbdModalDeleteBankAccountInvestiments } from './components/modalInvestiments/deleteBankAccountInvestiments/deleteBankAccountInvestiments';
import { NgbdModalDeleteCategoriesInvestiments } from './components/modalInvestiments/deleteCategoriesInvestiments/deleteCategoriesInvestiments';
import { BtnActionsInvestimentsComponent } from './components/private/btn-actionsInvestimentos/btn-actionsInvestimentos';


@NgModule({
  declarations: [
    AppComponent,
    NavbarExtComponent,
    HomeComponent,
    CadastroComponent,
    RodapeComponent,
    HeroComponent,
    LoginComponent,
    SobreComponent,
    PerfilComponent,
    NavbarIntComponent,
    TransacoesComponent,
    InvestimentosComponent,
    UserNotAuthComponent,
    BtnActionsInvestimentsComponent,

    // Other modals
    NgbdModalEmail,
    NgbdModalExcluirConta,
    BtnActionsComponent,

    // Add modals
    NgbdModalAddTransation,
    NgbdModalAddBankAccount,
    NgbdModaladdCategories,
    NgbdModalAddTransationInvestiments,
    NgbdModalAddBankAccountInvestiments,
    NgbdModaladdCategoriesInvestiments,

    // Edit modals
    NgbdModalEditTransation,
    NgbdModalEditBankAccount,
    NgbdModaleditCategories,
    NgbdModalEditTransationInvestiments,
    NgbdModalEditBankAccountInvestiments,
    NgbdModaleditCategoriesInvestiments,

    // Delete modals
    NgbdModalDeleteTransation,
    NgbdModalDeleteBankAccount,
    NgbdModalDeleteCategories,
    NgbdModalDeleteTransationInvestiments,
    NgbdModalDeleteBankAccountInvestiments,
    NgbdModalDeleteCategoriesInvestiments,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ChartModule,
    NgbModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule
  ],
  providers: [
    // AuthguardService,
    NgbModalConfig,
    NgbModal,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
