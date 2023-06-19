import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrepreneurReportSummaryComponent } from './entrepreneurReportSummary.component';
import { EntrepreneurReportSummaryComponentRoutingModule } from './entrepreneurReportSummary-routing';

import { entrepreneurCoursemodalComponent } from './entrepreneurReportSummary-modal.component';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from '@shared/common/accordion/accordion.module';
@NgModule({
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    AppSharedModule,
    CommonModule,
    NgxChartsModule,
    AccordionModule,
    EntrepreneurReportSummaryComponentRoutingModule,
  ],
  declarations: [EntrepreneurReportSummaryComponent, entrepreneurCoursemodalComponent]
})
export class EntrepreneurReportSummaryModule { }
