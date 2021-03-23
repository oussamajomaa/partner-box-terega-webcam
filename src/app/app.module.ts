import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material-module';
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { FrenchDateAdapter } from './date-adapter';
import { LOCALE_ID } from '@angular/core';

// For local fr
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr-FR');

// Import Component and service
import { AppComponent } from './app.component';
import { EditContractComponent } from './contract/edit-contract/edit-contract.component';
import { NavComponent } from './nav/nav.component';
import { AuthComponent } from './auth/auth.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PartnersComponent } from './partners/partners.component';
import { ProfileComponent } from './profile/profile.component';
import { DataService } from './services/data.service';
import { PermissionsService } from './services/permissions.service';
import { HomepageComponent } from './homepage/homepage.component';
import { CreateContractComponent } from './contract/create-contract/create-contract.component';
import { ListContractsComponent } from './contract/list-contracts/list-contracts.component';
import { InformationsComponent } from './dialog/informations/informations.component';
import { environment } from '../environments/environment';
import { DateAdapter } from '@angular/material/core';
import { PriseDeVuesModule } from './prise-de-vues/prise-de-vues.module';
import { FileUploadService } from './prise-de-vues/camera/file-upload-service.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AuthComponent,
    CalendarComponent,
    PartnersComponent,
    ProfileComponent,
    HomepageComponent,
    CreateContractComponent,
    ListContractsComponent,
    EditContractComponent,
    InformationsComponent,
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule.forRoot(environment.authConfig),
    PriseDeVuesModule
  ],

  providers: [
    PermissionsService,
    FileUploadService,
    DataService,
    { provide: DateAdapter, useClass: FrenchDateAdapter},
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
