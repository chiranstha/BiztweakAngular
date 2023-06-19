import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseRecommendationComponent } from './courseRecommendation.component';

const routes: Routes = [
  {
    path: '',
    component: CourseRecommendationComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRecommendationRoutingModule {}
