import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceComponent } from './Attendance.component';
import { AttendanceRoutingModule } from './Attendance-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AttendanceRoutingModule
  ],
  declarations: [AttendanceComponent]
})
export class AttendanceModule { }
