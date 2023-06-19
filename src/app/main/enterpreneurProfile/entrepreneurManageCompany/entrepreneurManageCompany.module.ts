import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrepreneurManageCompanyComponent } from './entrepreneurManageCompany.component';
import { EntrepreneurManageCompanyComponentRoutingModule } from './entrepreneurManageCompany-routing.module';
import { AccordionModule } from '@shared/common/accordion/accordion.module';
import { AppSharedModule } from '@app/shared/app-shared.module';

@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    AccordionModule,
    EntrepreneurManageCompanyComponentRoutingModule
  ],
  declarations: [EntrepreneurManageCompanyComponent]
})
export class EntrepreneurManageCompanyModule { }
