import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncubatorEntrepreneurReportComponent } from './incubatorEntrepreneurReport.component';
import { IncubatorEntrepreneurReportRoutingModule } from './incubatorEntrepreneurReport-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IncubatorEntrepreneurReportRoutingModule
  ],
  declarations: [IncubatorEntrepreneurReportComponent]
})
export class IncubatorEntrepreneurReportModule { }
