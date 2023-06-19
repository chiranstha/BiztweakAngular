import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrepreneurStatesComponent } from './entrepreneurStates.component';

const routes: Routes = [
  {
    path: '',
    component: EntrepreneurStatesComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrepreneurStateRoutingModule {}
