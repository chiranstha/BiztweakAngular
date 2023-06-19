import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrepreneurAssigmentComponent } from './entrepreneurAssigment.component';

const routes: Routes = [
  {
    path: '',
    component: EntrepreneurAssigmentComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrepreneurAssigmentRoutingModule {}
