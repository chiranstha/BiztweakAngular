import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrepreneurDataComponent } from './entrepreneurData.component';

const routes: Routes = [
    {
        path: '',
        component: EntrepreneurDataComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class  EntrepreneurDataRoutingModule {}
