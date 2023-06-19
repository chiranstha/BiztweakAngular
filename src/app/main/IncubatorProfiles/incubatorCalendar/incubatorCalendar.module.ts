import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncubatorCalendarComponent } from './incubatorCalendar.component';
import { IncubatorCalendarRoutingModule } from './incubatorCalendar-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IncubatorCalendarRoutingModule
  ],
  declarations: [IncubatorCalendarComponent]
})
export class IncubatorCalendarModule { }
