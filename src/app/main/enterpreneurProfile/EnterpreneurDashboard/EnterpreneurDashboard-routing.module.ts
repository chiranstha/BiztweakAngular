import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterpreneurDashboardComponent } from './EnterpreneurDashboard.component';


const routes: Routes = [
  {
    path: '',
    component: EnterpreneurDashboardComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterpreneurDashboardRoutingModule {}
