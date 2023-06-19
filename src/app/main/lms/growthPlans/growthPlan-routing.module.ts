import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrowthPlansComponent } from './growthPlans.component';

const routes: Routes = [
  {
    path: '',
    component: GrowthPlansComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrowthPlanRoutingModule {}
