import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorstatisticsComponent } from './instructorstatistics.component';


const routes: Routes = [
  {
    path: '',
    component: InstructorstatisticsComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorstatisticsRoutingModule {}
