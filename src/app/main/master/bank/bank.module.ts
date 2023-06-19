import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { BankRoutingModule } from './bank-routing.module';
import { BankComponent } from './bank.component';
import { CreateOrEditBankModalComponent } from './create-or-edit-bank-modal.component';
import { ViewBankModalComponent } from './view-bank-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BankComponent, CreateOrEditBankModalComponent, ViewBankModalComponent],
  imports: [AppSharedModule, BankRoutingModule, AdminSharedModule, NgSelectModule, ReactiveFormsModule],
})
export class BankModule {}
