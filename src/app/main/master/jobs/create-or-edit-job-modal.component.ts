import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { JobsServiceProxy, CreateOrEditJobDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
  selector: 'createOrEditJobModal',
  templateUrl: './create-or-edit-job-modal.component.html',
})
export class CreateOrEditJobModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;

  job: CreateOrEditJobDto = new CreateOrEditJobDto();

  constructor(
    injector: Injector,
    private _jobsServiceProxy: JobsServiceProxy,
    private _dateTimeService: DateTimeService
  ) {
    super(injector);
  }

  show(jobId?: string): void {
    if (!jobId) {
      this.job = new CreateOrEditJobDto();
      this.job.id = jobId;

      this.active = true;
      this.modal.show();
    } else {
      this._jobsServiceProxy.getJobForEdit(jobId).subscribe((result) => {
        this.job = result.job;

        this.active = true;
        this.modal.show();
      });
    }
  }
  showEdit(){
    this.active = true;
    this.modal.show();
  }
  save(): void {
    this.saving = true;

    this._jobsServiceProxy
      .createOrEdit(this.job)
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

  ngOnInit(): void {}
}
