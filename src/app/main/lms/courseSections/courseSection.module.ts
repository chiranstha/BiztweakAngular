import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { CourseSectionRoutingModule } from './courseSection-routing.module';
import { CourseSectionsComponent } from './courseSections.component';
import { CreateOrEditCourseSectionModalComponent } from './create-or-edit-courseSection-modal.component';
import { ViewCourseSectionModalComponent } from './view-courseSection-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppCommonModule } from '@app/shared/common/app-common.module';

@NgModule({
  declarations: [CourseSectionsComponent, CreateOrEditCourseSectionModalComponent, ViewCourseSectionModalComponent],
  imports: [AppSharedModule, CourseSectionRoutingModule, AdminSharedModule,   ReactiveFormsModule,NgSelectModule,  AppCommonModule,],
})
export class CourseSectionModule {}
