import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { EntrepreneurAssigmentRoutingModule } from './entrepreneurAssigment-routing.module';
import { EntrepreneurAssigmentComponent } from './entrepreneurAssigment.component';
import { CreateOrEditEntrepreneurAssigmentModalComponent } from './create-or-edit-entrepreneurAssigment-modal.component';
import { ViewEntrepreneurAssigmentModalComponent } from './view-entrepreneurAssigment-modal.component';

@NgModule({
  declarations: [
    EntrepreneurAssigmentComponent,
    CreateOrEditEntrepreneurAssigmentModalComponent,
    ViewEntrepreneurAssigmentModalComponent,
  ],
  imports: [AppSharedModule, EntrepreneurAssigmentRoutingModule, AdminSharedModule],
})
export class EntrepreneurAssigmentModule {}
