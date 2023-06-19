import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BizTweakCommonModule } from '@shared/common/common.module';
import { PagesComponent } from './Pages.component';
import { BusinessHealthReportComponent } from './business-health-report/business-health-report.component';
import { CreateComponent } from './create/create.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ManageCompanyComponent } from './manage-company/manage-company.component';
import { ModalPopupComponent } from './modal-popup/modal-popup.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    BizTweakCommonModule,
    ReactiveFormsModule,
    ModalModule
  ],
  declarations: [PagesComponent, FooterComponent, HomeComponent, BusinessHealthReportComponent,
   CreateComponent,  ManageCompanyComponent,
    ModalPopupComponent, ProfileComponent],
  exports: [FooterComponent],
  providers: [BsModalService],
})
export class PagesModule { }
