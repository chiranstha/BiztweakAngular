import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { JobRoutingModule } from './job-routing.module';
import { JobsComponent } from './jobs.component';
import { CreateOrEditJobModalComponent } from './create-or-edit-job-modal.component';
import { ViewJobModalComponent } from './view-job-modal.component';

@NgModule({
  declarations: [JobsComponent, CreateOrEditJobModalComponent, ViewJobModalComponent],
  imports: [AppSharedModule, JobRoutingModule, AdminSharedModule],
})
export class JobModule {}
