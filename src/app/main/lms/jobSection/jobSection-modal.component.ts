import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from "@angular/core";
import { DateTimeService } from "@app/shared/common/timing/date-time.service";
import { AppComponentBase } from "@shared/common/app-component-base";
import { CreateOrEditJobDto, JobsServiceProxy } from "@shared/service-proxies/service-proxies";
import { ModalDirective } from "ngx-bootstrap/modal";
import { finalize } from "rxjs";


@Component({
    selector: 'jobSectionModal',
    templateUrl: './jobSection-modal.component.html'
  })
  export class jobSectionModalComponent extends AppComponentBase implements OnInit {
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
