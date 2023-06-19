import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrepreneurHomePageComponent } from './EntrepreneurHomePage.component';

const routes: Routes = [
  {
    path: '',
    component: EntrepreneurHomePageComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrepreneurHomePageRoutingModule {}
