import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DigitalCateogoriesComponent } from './digitalCateogories.component';

const routes: Routes = [
  {
    path: '',
    component: DigitalCateogoriesComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DigitalCateogoryRoutingModule {}
