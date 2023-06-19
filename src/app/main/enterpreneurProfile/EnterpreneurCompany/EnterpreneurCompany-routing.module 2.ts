import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterpreneurCompanyComponent } from './EnterpreneurCompany.component';



const routes: Routes = [
  {
    path: '',
    component: EnterpreneurCompanyComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterpreneurCompanyRoutingModule {}
