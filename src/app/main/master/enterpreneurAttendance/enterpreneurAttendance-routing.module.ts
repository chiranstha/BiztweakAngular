import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterpreneurAttendanceComponent } from './enterpreneurAttendance.component';

const routes: Routes = [
  {
    path: '',
    component: EnterpreneurAttendanceComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterpreneurAttendanceRoutingModule {}
