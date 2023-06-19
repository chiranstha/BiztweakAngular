import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterpreneurGrowthPlanComponent } from './EnterpreneurGrowthPlan.component';
import { EnterpreneurGrowthPlanRoutingModule } from './EnterpreneurGrowthPlan-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EnterpreneurGrowthPlanRoutingModule
  ],
  declarations: [EnterpreneurGrowthPlanComponent]
})
export class EnterpreneurGrowthPlanModule { }
