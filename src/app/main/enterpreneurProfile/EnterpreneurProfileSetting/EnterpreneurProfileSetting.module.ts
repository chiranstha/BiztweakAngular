import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterpreneurProfileSettingComponent } from './EnterpreneurProfileSetting.component';
import { EnterpreneurProfileSettingRoutingModule } from './EnterpreneurProfileSetting-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppSharedModule } from '@app/shared/app-shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    EnterpreneurProfileSettingRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
     AppSharedModule
  ],
  declarations: [EnterpreneurProfileSettingComponent]
})
export class EnterpreneurProfileSettingModule { }
