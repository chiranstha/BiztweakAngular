import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseProgressComponent } from './CourseProgress.component';



const routes: Routes = [
  {
    path: '',
    component: CourseProgressComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseProgressRoutingModule {}
