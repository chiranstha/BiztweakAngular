import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { EntrepreneurRoutingModule } from './entrepreneur-routing.module';
import { EntrepreneursComponent } from './entrepreneurs.component';
import { CreateOrEditEntrepreneurModalComponent } from './create-or-edit-entrepreneur-modal.component';
import { ViewEntrepreneurModalComponent } from './view-entrepreneur-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [EntrepreneursComponent, CreateOrEditEntrepreneurModalComponent, ViewEntrepreneurModalComponent],
  imports: [AppSharedModule, EntrepreneurRoutingModule, AdminSharedModule, ReactiveFormsModule,NgSelectModule],
})
export class EntrepreneurModule {}
