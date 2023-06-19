import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EnterpreneurCalendarModule } from './enterpreneurCalendar.module';


const routes: Routes = [
  {
    path: '',
    component: EnterpreneurCalendarModule,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterpreneurCalendarRoutingModule {}
