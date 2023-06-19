import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrepreneurReportSummaryComponent } from './entrepreneurReportSummary.component';



const routes: Routes = [
  {
    path: '',
    component: EntrepreneurReportSummaryComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrepreneurReportSummaryComponentRoutingModule {}
