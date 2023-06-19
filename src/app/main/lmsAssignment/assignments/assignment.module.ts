import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AssignmentRoutingModule } from './assignment-routing.module';
import { AssignmentsComponent } from './assignments.component';
import { CreateOrEditAssignmentModalComponent } from './create-or-edit-assignment-modal.component';
import { ViewAssignmentModalComponent } from './view-assignment-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [AssignmentsComponent, CreateOrEditAssignmentModalComponent, ViewAssignmentModalComponent],
  imports: [AppSharedModule, AssignmentRoutingModule, AdminSharedModule, ReactiveFormsModule,
    NgSelectModule],
})
export class AssignmentModule {}
