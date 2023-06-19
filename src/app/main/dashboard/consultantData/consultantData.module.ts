import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultantDataComponent } from './consultantData.component';
import { ConsultantDataRoutingModule } from './consultantData-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ConsultantDataRoutingModule
  ],
  declarations: [ConsultantDataComponent]
})
export class ConsultantDataModule { }
