import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterpreneurAssigmentComponent } from './enterpreneurAssigment.component';

const routes: Routes = [
  {
    path: '',
    component: EnterpreneurAssigmentComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterpreneurAssigmentRoutingModule {}
