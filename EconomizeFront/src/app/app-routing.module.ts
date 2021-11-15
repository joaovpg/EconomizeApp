import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './components/public/cadastro/cadastro.component';
import { HomeComponent } from './components/public/home/home.component';
import { PerfilComponent } from './components/private/perfil/perfil.component';
import { TransacoesComponent } from './components/private/transacoes/transacoes.component';
import { InvestimentosComponent } from './components/private/investimentos/investimentos.component';
// import { AuthguardService } from './services/authguard.service';
import { UserNotAuthComponent } from './components/public/user-not-auth/user-not-auth.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'notAuth', component: UserNotAuthComponent },
  { path: 'perfil/:id', component: PerfilComponent, },
  { path: 'transacoes/:id', component: TransacoesComponent, },
  { path: 'investimentos/:id', component: InvestimentosComponent, },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
