import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { LessonRoutingModule } from './lesson-routing.module';
import { LessonsComponent } from './lessons.component';
import { CreateOrEditLessonModalComponent } from './create-or-edit-lesson-modal.component';
import { ViewLessonModalComponent } from './view-lesson-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [LessonsComponent, CreateOrEditLessonModalComponent, ViewLessonModalComponent],
  imports: [AppSharedModule, LessonRoutingModule, AdminSharedModule, ReactiveFormsModule, NgSelectModule],
})
export class LessonModule {}
