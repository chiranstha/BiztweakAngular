import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterpreneurAssessmentComponent } from './EnterpreneurAssessment.component';
import { EnterpreneurAssessmentRoutingModule } from './EnterpreneurAssessment-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from '@shared/common/accordion/accordion.module';

@NgModule({
  imports: [
    CommonModule,
    EnterpreneurAssessmentRoutingModule,
    AccordionModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [EnterpreneurAssessmentComponent]
})
export class EnterpreneurAssessmentModule { }
