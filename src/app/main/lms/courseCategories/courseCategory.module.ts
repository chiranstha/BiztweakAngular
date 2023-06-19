import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { CourseCategoryRoutingModule } from './courseCategory-routing.module';
import { CourseCategoriesComponent } from './courseCategories.component';
import { CreateOrEditCourseCategoryModalComponent } from './create-or-edit-courseCategory-modal.component';
import { ViewCourseCategoryModalComponent } from './view-courseCategory-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [CourseCategoriesComponent, CreateOrEditCourseCategoryModalComponent, ViewCourseCategoryModalComponent,],
  imports: [AppSharedModule, CourseCategoryRoutingModule, AdminSharedModule, ReactiveFormsModule,
    NgSelectModule],
})
export class CourseCategoryModule { }
