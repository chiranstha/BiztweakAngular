import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { InstructorsRoutingModule } from './instructors-routing.module';
import { InstructorComponent } from './instructor.component';
import { CreateOrEditInstructorsModalComponent } from './create-or-edit-instructors-modal.component';
import { ViewInstructorsModalComponent } from './view-instructors-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [InstructorComponent, CreateOrEditInstructorsModalComponent, ViewInstructorsModalComponent],
  imports: [AppSharedModule, InstructorsRoutingModule, AdminSharedModule, ReactiveFormsModule,NgSelectModule],
})
export class InstructorsModule {}
