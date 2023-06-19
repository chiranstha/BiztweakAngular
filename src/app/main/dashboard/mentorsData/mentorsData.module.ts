import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentorsDataComponent } from './mentorsData.component';
import { MentorsDataRoutingModule } from './mentorsData-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MentorsDataRoutingModule
  ],
  declarations: [MentorsDataComponent]
})
export class MentorsDataModule { }
