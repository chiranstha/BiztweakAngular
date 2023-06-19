import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrepreneurSubmittedComponent } from './entrepreneurSubmitted.component';

const routes: Routes = [
  {
    path: '',
    component: EntrepreneurSubmittedComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrepreneurSubmittedRoutingModule {}
