import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncubatorEntrepreneurReportComponent } from './incubatorEntrepreneurReport.component';




const routes: Routes = [
  {
    path: '',
    component: IncubatorEntrepreneurReportComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncubatorEntrepreneurReportRoutingModule {}
