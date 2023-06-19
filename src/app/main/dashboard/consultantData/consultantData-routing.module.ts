import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultantDataComponent } from './consultantData.component';

const routes: Routes = [
    {
        path: '',
        component: ConsultantDataComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ConsultantDataRoutingModule {}
