import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobSectionComponent } from './jobSection.component';

const routes: Routes = [
  {
    path: '',
    component: JobSectionComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobSectionRoutingModule {}
