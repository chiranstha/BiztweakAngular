import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncubatorCalendarComponent } from './incubatorCalendar.component';

const routes: Routes = [
    {
        path: '',
        component: IncubatorCalendarComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class IncubatorCalendarRoutingModule {}
