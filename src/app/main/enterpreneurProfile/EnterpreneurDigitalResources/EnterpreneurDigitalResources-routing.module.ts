import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterpreneurDigitalResourcesComponent } from './EnterpreneurDigitalResources.component';


const routes: Routes = [
  {
    path: '',
    component: EnterpreneurDigitalResourcesComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterpreneurDigitalResourcesRoutingModule {}
