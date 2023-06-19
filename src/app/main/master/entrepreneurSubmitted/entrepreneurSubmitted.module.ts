import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrepreneurSubmittedComponent } from './entrepreneurSubmitted.component';
import { EntrepreneurSubmittedRoutingModule } from './entrepreneurSubmitted-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AccordionModule } from '@shared/common/accordion/accordion.module';
@NgModule({
  imports: [
    CommonModule,
    EntrepreneurSubmittedRoutingModule,
    NgxChartsModule,
    AccordionModule,
  ],
  declarations: [EntrepreneurSubmittedComponent]
})
export class EntrepreneurSubmittedModule { }
