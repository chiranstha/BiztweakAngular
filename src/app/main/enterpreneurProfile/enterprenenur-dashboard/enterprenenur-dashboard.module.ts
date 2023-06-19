import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterprenenurDashboardComponent } from './enterprenenur-dashboard.component';
import { EnterprenenurDashboardRoutingModule } from './enterpreneur-dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EnterprenenurDashboardRoutingModule
  ],
  declarations: [EnterprenenurDashboardComponent]
})
export class EnterprenenurDashboardModule { }
