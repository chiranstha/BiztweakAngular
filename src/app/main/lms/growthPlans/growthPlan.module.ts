import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { GrowthPlanRoutingModule } from './growthPlan-routing.module';
import { GrowthPlansComponent } from './growthPlans.component';
import { CreateOrEditGrowthPlanModalComponent } from './create-or-edit-growthPlan-modal.component';
import { ViewGrowthPlanModalComponent } from './view-growthPlan-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [GrowthPlansComponent, CreateOrEditGrowthPlanModalComponent, ViewGrowthPlanModalComponent],
  imports: [AppSharedModule, GrowthPlanRoutingModule, AdminSharedModule, ReactiveFormsModule, NgSelectModule],
})
export class GrowthPlanModule {}
