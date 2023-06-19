import {NgModule} from '@angular/core';
import {AppSharedModule} from '@app/shared/app-shared.module';
import {AdminSharedModule} from '@app/admin/shared/admin-shared.module';
import {LmsprorityRoutingModule} from './lmsprority-routing.module';
import {LmsproritiesComponent} from './lmsprorities.component';
import {CreateOrEditLmsprorityComponent} from './create-or-edit-lmsprority.component';
import {ViewLmsprorityComponent} from './view-lmsprority.component';



@NgModule({
    declarations: [
        LmsproritiesComponent,
        CreateOrEditLmsprorityComponent,
        ViewLmsprorityComponent,
        
    ],
    imports: [AppSharedModule, LmsprorityRoutingModule , AdminSharedModule ],
    
})
export class LmsprorityModule {
}
