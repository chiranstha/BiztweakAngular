import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { EntrepreneurStateRoutingModule } from './entrepreneurState-routing.module';
import { EntrepreneurStatesComponent } from './entrepreneurStates.component';
import { CreateOrEditEntrepreneurStateModalComponent } from './create-or-edit-entrepreneurState-modal.component';
import { ViewEntrepreneurStateModalComponent } from './view-entrepreneurState-modal.component';
import { EntrepreneurStateEntrepreneurLookupTableModalComponent } from './entrepreneurState-entrepreneur-lookup-table-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    EntrepreneurStatesComponent,
    CreateOrEditEntrepreneurStateModalComponent,
    ViewEntrepreneurStateModalComponent,

    EntrepreneurStateEntrepreneurLookupTableModalComponent,
  ],
  imports: [AppSharedModule, EntrepreneurStateRoutingModule, AdminSharedModule, ReactiveFormsModule,NgSelectModule ],
})
export class EntrepreneurStateModule {}
