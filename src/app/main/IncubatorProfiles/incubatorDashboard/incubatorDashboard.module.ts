import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncubatorDashboardComponent } from './incubatorDashboard.component';
import { IncubatorDashboardRoutingModule } from './incubatorDashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IncubatorDashboardRoutingModule
  ],
  declarations: [IncubatorDashboardComponent]
})
export class IncubatorDashboardModule { }
