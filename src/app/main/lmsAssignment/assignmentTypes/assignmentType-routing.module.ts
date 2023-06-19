import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentTypesComponent } from './assignmentTypes.component';

const routes: Routes = [
  {
    path: '',
    component: AssignmentTypesComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignmentTypeRoutingModule {}
