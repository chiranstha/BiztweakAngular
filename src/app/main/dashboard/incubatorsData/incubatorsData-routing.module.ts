import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncubatorComponent } from '@app/main/master/incubator/incubator.component';
import { IncubatorsDataComponent } from './incubatorsData.component';


const routes: Routes = [
    {
        path: '',
        component: IncubatorsDataComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class IncubatorsDataRoutingModule {}
