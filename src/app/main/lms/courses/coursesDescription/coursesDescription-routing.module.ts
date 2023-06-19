import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesDescriptionComponent } from './coursesDescription.component';


const routes: Routes = [
  {
    path: '',
    component: CoursesDescriptionComponent,
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class coursesDescriptionRoutingModule {}
