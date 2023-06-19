import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AssignmentTypeRoutingModule } from './assignmentType-routing.module';
import { AssignmentTypesComponent } from './assignmentTypes.component';
import { CreateOrEditAssignmentTypeModalComponent } from './create-or-edit-assignmentType-modal.component';
import { ViewAssignmentTypeModalComponent } from './view-assignmentType-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AssignmentTypesComponent, CreateOrEditAssignmentTypeModalComponent, ViewAssignmentTypeModalComponent],
  imports: [AppSharedModule, AssignmentTypeRoutingModule, AdminSharedModule,
    ReactiveFormsModule],
})
export class AssignmentTypeModule {}
