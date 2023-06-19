import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterpreneurDigitalResourcesComponent } from './EnterpreneurDigitalResources.component';
import { EnterpreneurDigitalResourcesRoutingModule } from './EnterpreneurDigitalResources-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EnterpreneurDigitalResourcesRoutingModule
  ],
  declarations: [EnterpreneurDigitalResourcesComponent]
})
export class EnterpreneurDigitalResourcesModule { }
