import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrepreneurLMSComponent } from './entrepreneurLMS.component';



const routes: Routes = [
  {
    path: '',
    component: EntrepreneurLMSComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrepreneurLMSRoutingModule {}
