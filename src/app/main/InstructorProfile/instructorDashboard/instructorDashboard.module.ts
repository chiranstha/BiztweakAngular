import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorDashboardComponent } from './instructorDashboard.component';
import { InstructorDashboardRoutingModule } from './instructorDashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    InstructorDashboardRoutingModule
  ],
  declarations: [InstructorDashboardComponent]
})
export class InstructorDashboardModule { }
