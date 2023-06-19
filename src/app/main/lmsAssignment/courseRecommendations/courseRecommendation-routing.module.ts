import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseRecommendationsComponent } from './courseRecommendations.component';

const routes: Routes = [
  {
    path: '',
    component: CourseRecommendationsComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRecommendationRoutingModule {}
