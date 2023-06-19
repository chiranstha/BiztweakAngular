import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { EntrepreneurAttendanceRoutingModule } from './entrepreneurAttendance-routing.module';
import { EntrepreneurAttendanceComponent } from './entrepreneurAttendance.component';
import { CreateOrEditEntrepreneurAttendanceModalComponent } from './create-or-edit-entrepreneurAttendance-modal.component';
import { ViewEntrepreneurAttendanceModalComponent } from './view-entrepreneurAttendance-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    EntrepreneurAttendanceComponent,
    CreateOrEditEntrepreneurAttendanceModalComponent,
    ViewEntrepreneurAttendanceModalComponent,
  ],
  imports: [AppSharedModule, EntrepreneurAttendanceRoutingModule, AdminSharedModule, ReactiveFormsModule, NgSelectModule],
})
export class EntrepreneurAttendanceModule {}
