import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncubatorAdminUsersComponent } from './incubatorAdminUsers.component';

const routes: Routes = [
    {
        path: '',
        component: IncubatorAdminUsersComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class IncubatorAdminUsersRoutingModule {}
