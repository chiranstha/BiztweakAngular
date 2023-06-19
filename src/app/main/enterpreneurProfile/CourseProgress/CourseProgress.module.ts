import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseProgressComponent } from './CourseProgress.component';
import { CourseProgressRoutingModule } from './courseProgress-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CourseProgressRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CourseProgressComponent]
})
export class CourseProgressModule { }
