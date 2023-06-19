import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { DigitalCateogoryRoutingModule } from './digitalCateogory-routing.module';
import { DigitalCateogoriesComponent } from './digitalCateogories.component';
import { CreateOrEditDigitalCateogoryModalComponent } from './create-or-edit-digitalCateogory-modal.component';
import { ViewDigitalCateogoryModalComponent } from './view-digitalCateogory-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    DigitalCateogoriesComponent,
    CreateOrEditDigitalCateogoryModalComponent,
    ViewDigitalCateogoryModalComponent,
  ],
  imports: [AppSharedModule, DigitalCateogoryRoutingModule, AdminSharedModule, ReactiveFormsModule, NgSelectModule],
})
export class DigitalCateogoryModule {}
