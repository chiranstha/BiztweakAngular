import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterpreneurDigitalToolsComponent } from './EnterpreneurDigitalTools.component';




const routes: Routes = [
  {
    path: '',
    component: EnterpreneurDigitalToolsComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterpreneurDigitalToolsRoutingModule {}
