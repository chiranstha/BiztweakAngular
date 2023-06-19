import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterpreneurCompanyComponent } from './EnterpreneurCompany.component';
import { EnterpreneurCompanyRoutingModule } from './EnterpreneurCompany-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { AccordionModule } from '@shared/common/accordion/accordion.module';
// import { GooglePlaceModule } from "ngx-google-places-autocomplete";
@NgModule({
  imports: [
    CommonModule,
    EnterpreneurCompanyRoutingModule,
    ReactiveFormsModule,
    AccordionModule,
    ModalModule.forRoot(), 
    AppSharedModule, 
    NgSelectModule,
    // GooglePlaceModule
  ],
  declarations: [EnterpreneurCompanyComponent]
})
export class EnterpreneurCompanyModule { }
