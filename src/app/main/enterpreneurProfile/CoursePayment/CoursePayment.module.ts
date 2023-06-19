import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursePaymentComponent } from './CoursePayment.component';
import { CoursePaymentRoutingModule } from './CoursePayment-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CoursePaymentRoutingModule
  ],
  declarations: [CoursePaymentComponent]
})
export class CoursePaymentModule { }
