import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DigitalResourceComponent } from './digitalResource.component';

const routes: Routes = [
  {
    path: '',
    component: DigitalResourceComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DigitalResourceRoutingModule {}
