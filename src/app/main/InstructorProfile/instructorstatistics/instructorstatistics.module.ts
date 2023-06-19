import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorstatisticsComponent } from './instructorstatistics.component';
import { InstructorstatisticsRoutingModule } from './instructorstatistics-routing.module';

@NgModule({
  imports: [
    CommonModule,
    InstructorstatisticsRoutingModule
  ],
  declarations: [InstructorstatisticsComponent]
})
export class InstructorstatisticsModule { }
