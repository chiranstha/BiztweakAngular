import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncubatorsDataComponent } from './incubatorsData.component';
import { IncubatorsDataRoutingModule } from './incubatorsData-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IncubatorsDataRoutingModule
  ],
  declarations: [IncubatorsDataComponent]
})
export class IncubatorsDataModule { }
