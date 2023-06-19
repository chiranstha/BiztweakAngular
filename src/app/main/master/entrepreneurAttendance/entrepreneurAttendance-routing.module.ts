import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrepreneurAttendanceComponent } from './entrepreneurAttendance.component';

const routes: Routes = [
  {
    path: '',
    component: EntrepreneurAttendanceComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrepreneurAttendanceRoutingModule {}
