import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { IncubatorRoutingModule } from './incubator-routing.module';
import { IncubatorComponent } from './incubator.component';
import { CreateOrEditIncubatorModalComponent } from './create-or-edit-incubator-modal.component';
import { ViewIncubatorModalComponent } from './view-incubator-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [IncubatorComponent, CreateOrEditIncubatorModalComponent, ViewIncubatorModalComponent],
  imports: [AppSharedModule, IncubatorRoutingModule, AdminSharedModule,  ReactiveFormsModule, NgSelectModule],
})
export class IncubatorModule {}
