import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { EnterpreneurAttendanceRoutingModule } from './enterpreneurAttendance-routing.module';
import { EnterpreneurAttendanceComponent } from './enterpreneurAttendance.component';
import { CreateOrEditEnterpreneurAttendanceModalComponent } from './create-or-edit-enterpreneurAttendance-modal.component';
import { ViewEnterpreneurAttendanceModalComponent } from './view-enterpreneurAttendance-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    EnterpreneurAttendanceComponent,
    CreateOrEditEnterpreneurAttendanceModalComponent,
    ViewEnterpreneurAttendanceModalComponent,
  ],
  imports: [AppSharedModule, EnterpreneurAttendanceRoutingModule, AdminSharedModule, ReactiveFormsModule, NgSelectModule],
})
export class EnterpreneurAttendanceModule {}
