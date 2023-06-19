import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EnterpreneurGrowthPlanComponent } from './EnterpreneurGrowthPlan.component';


const routes: Routes = [
  {
    path: '',
    component: EnterpreneurGrowthPlanComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterpreneurGrowthPlanRoutingModule {}
