import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorEntrepreneurReportComponent } from './instructorEntrepreneurReport.component';


const routes: Routes = [
  {
    path: '',
    component: InstructorEntrepreneurReportComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorEntrepreneurReportRoutingModule {}
