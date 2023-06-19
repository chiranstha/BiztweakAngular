import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorEntrepreneurReportComponent } from './instructorEntrepreneurReport.component';
import { InstructorEntrepreneurReportRoutingModule } from './instructorEntrepreneurReport-routing.module';

@NgModule({
  imports: [
    CommonModule,
    InstructorEntrepreneurReportRoutingModule
  ],
  declarations: [InstructorEntrepreneurReportComponent]
})
export class InstructorEntrepreneurReportModule { }
