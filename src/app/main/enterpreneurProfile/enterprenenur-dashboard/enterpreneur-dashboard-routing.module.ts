import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterprenenurDashboardComponent } from './enterprenenur-dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: EnterprenenurDashboardComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterprenenurDashboardRoutingModule {}
