import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterpreneurCourseProfileComponent } from './enterpreneurCourseProfile.component';



const routes: Routes = [
  {
    path: '',
    component: EnterpreneurCourseProfileComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterpreneurCourseProfileRoutingModule {}
