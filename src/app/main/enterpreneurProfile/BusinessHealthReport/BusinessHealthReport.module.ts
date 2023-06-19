import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessHealthReportComponent } from './BusinessHealthReport.component';
import { BusinessHealthReportRoutingModule } from './BusinessHealthReport-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BusinessHealthReportRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BusinessHealthReportComponent]
})
export class BusinessHealthReportModule { }
