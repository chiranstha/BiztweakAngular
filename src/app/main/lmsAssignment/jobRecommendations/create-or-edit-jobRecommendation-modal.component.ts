import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import {
  JobRecommendationsServiceProxy,
  CreateOrEditJobRecommendationDto,
  JobRecommendationAssignmentLookupTableDto,
  JobRecommendationJobLookupTableDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
  selector: 'createOrEditJobRecommendationModal',
  templateUrl: './create-or-edit-jobRecommendation-modal.component.html',
})
export class CreateOrEditJobRecommendationModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;

  jobRecommendation: CreateOrEditJobRecommendationDto = new CreateOrEditJobRecommendationDto();

  assignmentName = '';
  jobName = '';

  allAssignments: JobRecommendationAssignmentLookupTableDto[];
  allJobs: JobRecommendationJobLookupTableDto[];

  constructor(
    injector: Injector,
    private _jobRecommendationsServiceProxy: JobRecommendationsServiceProxy,
    private _dateTimeService: DateTimeService
  ) {
    super(injector);
  }


  ngOnInit(): void {
    this.getAllJob();
  }

  show(assignmentId: string, jobRecommendationId?: string): void {
    if (!jobRecommendationId) {
      this.jobRecommendation = new CreateOrEditJobRecommendationDto();
      this.jobRecommendation.id = jobRecommendationId;
      this.jobRecommendation.assignmentId = assignmentId;
      this.assignmentName = '';
      this.jobName = '';

      this.active = true;
      this.modal.show();
    } else {
      this._jobRecommendationsServiceProxy.getJobRecommendationForEdit(jobRecommendationId).subscribe((result) => {
        this.jobRecommendation = result.jobRecommendation;

        this.assignmentName = result.assignmentName;
        this.jobName = result.jobName;

        this.active = true;
        this.modal.show();
      });
    }
  }

  getAllJob() {
    this._jobRecommendationsServiceProxy.getAllJobForTableDropdown().subscribe((result) => {
      this.allJobs = result;
    });
  }

  save(): void {
    this.saving = true;

    this._jobRecommendationsServiceProxy
      .createOrEdit(this.jobRecommendation)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.close();
        this.modalSave.emit(null);
      });
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }

}
