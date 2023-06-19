import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobRecommendationsServiceProxy, JobRecommendationDto } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditJobRecommendationModalComponent } from './create-or-edit-jobRecommendation-modal.component';

import { ViewJobRecommendationModalComponent } from './view-jobRecommendation-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { filter as _filter } from 'lodash-es';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
  templateUrl: './jobRecommendations.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
})
export class JobRecommendationsComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditJobRecommendationModal', { static: true })
  createOrEditJobRecommendationModal: CreateOrEditJobRecommendationModalComponent;
  @ViewChild('viewJobRecommendationModalComponent', { static: true })
  viewJobRecommendationModal: ViewJobRecommendationModalComponent;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  advancedFiltersAreShown = false;
  filterText = '';
  assignmentId: string;

  constructor(
    injector: Injector,
    private _jobRecommendationsServiceProxy: JobRecommendationsServiceProxy,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _fileDownloadService: FileDownloadService,
    private _dateTimeService: DateTimeService,
    private route: ActivatedRoute,
  ) {
    super(injector);
  }


  ngOnInit(): void {
    this.assignmentId = this.route.snapshot.params['assignmentId'];
  }

  getJobRecommendations(event?: LazyLoadEvent) {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      if (this.primengTableHelper.records && this.primengTableHelper.records.length > 0) {
        return;
      }
    }

    this.primengTableHelper.showLoadingIndicator();

    this._jobRecommendationsServiceProxy
      .getAll(
        this.assignmentId,
        this.filterText,
        this.primengTableHelper.getSorting(this.dataTable),
        this.primengTableHelper.getSkipCount(this.paginator, event),
        this.primengTableHelper.getMaxResultCount(this.paginator, event)
      )
      .subscribe((result) => {
        this.primengTableHelper.totalRecordsCount = result.totalCount;
        this.primengTableHelper.records = result.items;
        this.primengTableHelper.hideLoadingIndicator();
      });
  }

  reloadPage(): void {
    this.paginator.changePage(this.paginator.getPage());
  }

  createJobRecommendation(): void {
    this.createOrEditJobRecommendationModal.show(this.assignmentId, null);
  }
  deleteJobRecommendation(jobRecommendation: JobRecommendationDto): void {
    this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
      if (isConfirmed) {
        this._jobRecommendationsServiceProxy.delete(jobRecommendation.id).subscribe(() => {
          this.reloadPage();
          this.notify.success(this.l('SuccessfullyDeleted'));
        });
      }
    });
  }
}
