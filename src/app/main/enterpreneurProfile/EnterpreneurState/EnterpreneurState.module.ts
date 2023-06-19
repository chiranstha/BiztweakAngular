import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterpreneurStateComponent } from './EnterpreneurState.component';
import { EnterpreneurStateRoutingModule } from './EnterpreneurState-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EnterpreneurStateRoutingModule
  ],
  declarations: [EnterpreneurStateComponent]
})
export class EnterpreneurStateModule { }
