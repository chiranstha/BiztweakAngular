import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsServiceProxy,  GetJobForViewDto } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditJobModalComponent } from './create-or-edit-job-modal.component';

import { ViewJobModalComponent } from './view-job-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { filter as _filter } from 'lodash-es';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
  templateUrl: './jobs.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
})
export class JobsComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditJobModal', { static: true }) createOrEditJobModal: CreateOrEditJobModalComponent;
  @ViewChild('viewJobModalComponent', { static: true }) viewJobModal: ViewJobModalComponent;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  advancedFiltersAreShown = false;
  filterText = '';
  sorting: string;
  totalCount: number;
  jobDataItem: GetJobForViewDto[];
  constructor(
    injector: Injector,
    private _jobsServiceProxy: JobsServiceProxy,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _fileDownloadService: FileDownloadService,
    private _dateTimeService: DateTimeService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getJobs();
  }

  getJobs(event?: LazyLoadEvent) {
     this._jobsServiceProxy
    .getAll(this.filterText,  this.sorting, this.biztweakRpag.skipCount, this.biztweakRpag.itemSize).subscribe(res => {
      this.totalCount = res.totalCount;
      this.jobDataItem  = res.items;
    });
  }

  reloadPage(): void {
    this.paginator.changePage(this.paginator.getPage());
  }

  createJob(): void {
    this.createOrEditJobModal.show();
  }

  deleteJob(id: string): void {
    this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
      if (isConfirmed) {
        this._jobsServiceProxy.delete(id).subscribe(() => {
        this.getJobs();
          this.notify.success(this.l('SuccessfullyDeleted'));
        });
      }
    });
  }
}
