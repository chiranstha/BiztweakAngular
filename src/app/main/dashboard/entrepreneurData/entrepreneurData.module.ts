import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrepreneurDataComponent } from './entrepreneurData.component';
import { EntrepreneurDataRoutingModule } from './entrepreneurData-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EntrepreneurDataRoutingModule
  ],
  declarations: [EntrepreneurDataComponent]
})
export class EntrepreneurDataModule { }
