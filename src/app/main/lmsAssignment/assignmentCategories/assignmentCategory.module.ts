import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AssignmentCategoryRoutingModule } from './assignmentCategory-routing.module';
import { AssignmentCategoriesComponent } from './assignmentCategories.component';
import { CreateOrEditAssignmentCategoryModalComponent } from './create-or-edit-assignmentCategory-modal.component';
import { ViewAssignmentCategoryModalComponent } from './view-assignmentCategory-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AssignmentCategoriesComponent,
    CreateOrEditAssignmentCategoryModalComponent,
    ViewAssignmentCategoryModalComponent,
  ],
  imports: [AppSharedModule, AssignmentCategoryRoutingModule, AdminSharedModule, ReactiveFormsModule, NgSelectModule],
})
export class AssignmentCategoryModule {}
