import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterpreneurCalendarComponent } from './enterpreneurCalendar.component';
import { EnterpreneurCalendarRoutingModule } from './Enterpreneurcalendar-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EnterpreneurCalendarRoutingModule
  ],
  declarations: [EnterpreneurCalendarComponent]
})
export class EnterpreneurCalendarModule { }
