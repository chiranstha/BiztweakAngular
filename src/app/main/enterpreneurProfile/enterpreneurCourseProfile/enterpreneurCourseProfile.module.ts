import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterpreneurCourseProfileComponent } from './enterpreneurCourseProfile.component';
import { EnterpreneurCourseProfileRoutingModule } from './enterpreneurCourseProfile-routing.module';
import { enterpreneurCompanymodalComponent } from './enterpreneurCompany-modal.component';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  imports: [
    CommonModule,
    EnterpreneurCourseProfileRoutingModule,
    AppSharedModule,
    AdminSharedModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    NgSelectModule
  ],
  declarations: [EnterpreneurCourseProfileComponent, enterpreneurCompanymodalComponent]
})
export class EnterpreneurCourseProfileModule { }
