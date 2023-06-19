import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCoursesComponent } from './myCourses.component';
import { MyCoursesRoutingModule } from './myCourses-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MyCoursesRoutingModule
  ],
  declarations: [MyCoursesComponent]
})
export class MyCoursesModule { }
