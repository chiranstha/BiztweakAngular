import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterpreneurCoursesComponent } from './EnterpreneurCourses.component';


const routes: Routes = [
  {
    path: '',
    component: EnterpreneurCoursesComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterpreneurCoursesRoutingModule {}
