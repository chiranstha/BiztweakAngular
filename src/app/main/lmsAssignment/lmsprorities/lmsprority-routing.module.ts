import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LmsproritiesComponent} from './lmsprorities.component';
import {CreateOrEditLmsprorityComponent} from './create-or-edit-lmsprority.component';
import {ViewLmsprorityComponent} from './view-lmsprority.component';

const routes: Routes = [
    {
        path: '',
        component: LmsproritiesComponent,
        pathMatch: 'full'
    },
    
			    {
                    path: 'createOrEdit',
                    component: CreateOrEditLmsprorityComponent,
                    pathMatch: 'full'
                },
			
    
			    {
                    path: 'view',
                    component: ViewLmsprorityComponent,
                    pathMatch: 'full'
                }
			
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LmsprorityRoutingModule {
}
