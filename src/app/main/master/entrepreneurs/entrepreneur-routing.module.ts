import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrepreneursComponent } from './entrepreneurs.component';

const routes: Routes = [
  {
    path: '',
    component: EntrepreneursComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrepreneurRoutingModule {}
