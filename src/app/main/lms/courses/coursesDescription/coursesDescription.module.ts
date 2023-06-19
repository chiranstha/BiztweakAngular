import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesDescriptionComponent } from './coursesDescription.component';
import { coursesDescriptionRoutingModule } from './coursesDescription-routing.module';
import { CreateOrEditCoursedescriptionModalComponent } from './create-or-edit-coursedescription-modal.component';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CreateOrEditSectionModalComponent } from './create-or-edit-section-modal.component';

@NgModule({
  imports: [
    AppSharedModule,
    AdminSharedModule,
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    coursesDescriptionRoutingModule
  ],
  declarations: [CoursesDescriptionComponent, CreateOrEditCoursedescriptionModalComponent, CreateOrEditSectionModalComponent],
})
export class CoursesDescriptionModule { }
