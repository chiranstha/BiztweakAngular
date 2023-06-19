import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorAdminUsersComponent } from './instructorAdminUsers.component';


const routes: Routes = [
  {
    path: '',
    component: InstructorAdminUsersComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorAdminUsersRoutingModule {}
