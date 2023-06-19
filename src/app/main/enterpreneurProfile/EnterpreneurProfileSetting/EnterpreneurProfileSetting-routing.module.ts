import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterpreneurProfileSettingComponent } from './EnterpreneurProfileSetting.component';


const routes: Routes = [
  {
    path: '',
    component: EnterpreneurProfileSettingComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterpreneurProfileSettingRoutingModule {}
