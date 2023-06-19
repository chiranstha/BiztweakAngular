import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseCategoriesComponent } from './courseCategories.component';

const routes: Routes = [
  {
    path: '',
    component: CourseCategoriesComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseCategoryRoutingModule {}
