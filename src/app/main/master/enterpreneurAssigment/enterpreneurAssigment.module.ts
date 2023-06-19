import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { EnterpreneurAssigmentRoutingModule } from './enterpreneurAssigment-routing.module';
import { EnterpreneurAssigmentComponent } from './enterpreneurAssigment.component';
import { CreateOrEditEnterpreneurAssigmentModalComponent } from './create-or-edit-enterpreneurAssigment-modal.component';
import { ViewEnterpreneurAssigmentModalComponent } from './view-enterpreneurAssigment-modal.component';

@NgModule({
  declarations: [
    EnterpreneurAssigmentComponent,
    CreateOrEditEnterpreneurAssigmentModalComponent,
    ViewEnterpreneurAssigmentModalComponent,
  ],
  imports: [AppSharedModule, EnterpreneurAssigmentRoutingModule, AdminSharedModule],
})
export class EnterpreneurAssigmentModule {}
