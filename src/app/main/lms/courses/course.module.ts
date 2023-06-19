import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { CourseRoutingModule } from './course-routing.module';
import { CoursesComponent } from './courses.component';
import { CreateOrEditCourseModalComponent } from './create-or-edit-course-modal.component';
import { ViewCourseModalComponent } from './view-course-modal.component';
import { CourseCourseCategoryLookupTableModalComponent } from './course-courseCategory-lookup-table-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import {NgSelectModule } from '@ng-select/ng-select';
import { CoursesDescriptionModule } from './coursesDescription/coursesDescription.module';

@NgModule({
  declarations: [
    CoursesComponent,
    CreateOrEditCourseModalComponent,
    ViewCourseModalComponent,
    
    CourseCourseCategoryLookupTableModalComponent,
  ],
  imports: [AppSharedModule, CourseRoutingModule, AdminSharedModule, ReactiveFormsModule,NgSelectModule, CoursesDescriptionModule,

  ],
})
export class CourseModule {}
