import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { DigitalResourceRoutingModule } from './digitalResource-routing.module';
import { DigitalResourceComponent } from './digitalResource.component';
import { CreateOrEditDigitalResourceModalComponent } from './create-or-edit-digitalResource-modal.component';
import { ViewDigitalResourceModalComponent } from './view-digitalResource-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    DigitalResourceComponent,
    CreateOrEditDigitalResourceModalComponent,
    ViewDigitalResourceModalComponent,
  ],
  imports: [AppSharedModule, DigitalResourceRoutingModule, AdminSharedModule, ReactiveFormsModule,NgSelectModule ],
})
export class DigitalResourceModule {}
