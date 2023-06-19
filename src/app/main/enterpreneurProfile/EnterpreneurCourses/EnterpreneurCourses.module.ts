import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterpreneurCoursesComponent } from './EnterpreneurCourses.component';
import { EnterpreneurCoursesRoutingModule } from './EnterpreneurCourses.routing.module';

@NgModule({
  imports: [
    CommonModule,
    EnterpreneurCoursesRoutingModule
  ],
  declarations: [EnterpreneurCoursesComponent]
})
export class EnterpreneurCoursesModule { }
