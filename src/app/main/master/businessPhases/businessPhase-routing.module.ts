import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessPhasesComponent } from './businessPhases.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessPhasesComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessPhaseRoutingModule {}
