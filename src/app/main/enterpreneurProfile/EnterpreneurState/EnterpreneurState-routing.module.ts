import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterpreneurStateComponent } from './EnterpreneurState.component';


const routes: Routes = [
  {
    path: '',
    component: EnterpreneurStateComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterpreneurStateRoutingModule {}
