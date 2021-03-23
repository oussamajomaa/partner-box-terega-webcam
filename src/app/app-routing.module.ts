import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { PartnersComponent } from './partners/partners.component';
import { ProfileComponent } from './profile/profile.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CreateContractComponent } from './contract/create-contract/create-contract.component';
import { ListContractsComponent } from './contract/list-contracts/list-contracts.component';
import { EditContractComponent } from './contract/edit-contract/edit-contract.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { PriseDeVuesModule } from './prise-de-vues/prise-de-vues.module';


const routes: Routes = [
  { path: 'calendrier', canActivate: [AuthGuard], component: CalendarComponent},
  { path: 'contrats', canActivate: [AuthGuard], component: ListContractsComponent },
  { path: 'contrats/creer', canActivate: [AuthGuard], component: CreateContractComponent },
  { path: 'contrats/modifier/:id', canActivate: [AuthGuard], component: EditContractComponent },
  { path: 'partenaires', canActivate: [AuthGuard], component: PartnersComponent },
  { path: 'profil', canActivate: [AuthGuard], component: ProfileComponent },
  { path: 'prisedevues', canActivate: [AuthGuard], loadChildren: ()=> import('./prise-de-vues/prise-de-vues.module').then(module => module.PriseDeVuesModule) },
  { path: 'accueil', component: HomepageComponent },

  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', redirectTo: 'profil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }), PriseDeVuesModule],
  exports: [RouterModule]
})

export class AppRoutingModule { }
