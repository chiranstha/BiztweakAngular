import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { IndustryRoutingModule } from './industry-routing.module';
import { IndustriesComponent } from './industries.component';
import { CreateOrEditIndustryModalComponent } from './create-or-edit-industry-modal.component';
import { ViewIndustryModalComponent } from './view-industry-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [IndustriesComponent, CreateOrEditIndustryModalComponent, ViewIndustryModalComponent],
  imports: [AppSharedModule, IndustryRoutingModule, AdminSharedModule, ReactiveFormsModule, NgSelectModule],
})
export class IndustryModule {}
