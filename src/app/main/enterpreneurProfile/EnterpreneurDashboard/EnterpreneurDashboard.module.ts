import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterpreneurDashboardComponent } from './EnterpreneurDashboard.component';
import { EnterpreneurDashboardRoutingModule } from './EnterpreneurDashboard-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    EnterpreneurDashboardRoutingModule,
    ModalModule.forRoot()
  ],
  declarations: [EnterpreneurDashboardComponent]
})
export class EnterpreneurDashboardModule { }
