import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmissionComponent } from './Submission.component';
import { SubmissionRoutingModule } from './Submission-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SubmissionRoutingModule
  ],
  declarations: [SubmissionComponent]
})
export class SubmissionModule { }
