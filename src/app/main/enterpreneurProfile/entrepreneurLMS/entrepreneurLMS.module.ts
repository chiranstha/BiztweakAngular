import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrepreneurLMSComponent } from './entrepreneurLMS.component';
import { EntrepreneurLMSRoutingModule } from './entrepreneurLMS-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EntrepreneurLMSRoutingModule
  ],
  declarations: [EntrepreneurLMSComponent]
})
export class EntrepreneurLMSModule { }
