import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MentorsDataComponent } from './mentorsData.component';

const routes: Routes = [
    {
        path: '',
        component: MentorsDataComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MentorsDataRoutingModule {}
