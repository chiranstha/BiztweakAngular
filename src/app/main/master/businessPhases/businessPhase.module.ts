import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { BusinessPhaseRoutingModule } from './businessPhase-routing.module';
import { BusinessPhasesComponent } from './businessPhases.component';
import { CreateOrEditBusinessPhaseModalComponent } from './create-or-edit-businessPhase-modal.component';
import { ViewBusinessPhaseModalComponent } from './view-businessPhase-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BusinessPhasesComponent, CreateOrEditBusinessPhaseModalComponent, ViewBusinessPhaseModalComponent],
  imports: [AppSharedModule, BusinessPhaseRoutingModule, AdminSharedModule, ReactiveFormsModule],
})
export class BusinessPhaseModule {}
