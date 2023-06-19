import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentCategoriesComponent } from './assignmentCategories.component';

const routes: Routes = [
  {
    path: '',
    component: AssignmentCategoriesComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignmentCategoryRoutingModule {}
