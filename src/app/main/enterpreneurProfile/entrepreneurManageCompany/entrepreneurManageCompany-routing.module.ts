import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrepreneurManageCompanyComponent } from './entrepreneurManageCompany.component';



const routes: Routes = [
  {
    path: '',
    component: EntrepreneurManageCompanyComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrepreneurManageCompanyComponentRoutingModule {}
