import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessHealthReportComponent } from './BusinessHealthReport.component';




const routes: Routes = [
  {
    path: '',
    component: BusinessHealthReportComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessHealthReportRoutingModule {}
