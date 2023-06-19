import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobRecommendationsComponent } from './jobRecommendations.component';

const routes: Routes = [
  {
    path: '',
    component: JobRecommendationsComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobRecommendationRoutingModule {}
