import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncubatorComponent } from './incubator.component';

const routes: Routes = [
  {
    path: '',
    component: IncubatorComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncubatorRoutingModule {}
