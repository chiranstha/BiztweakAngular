import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnterpreneurAttendanceServiceProxy } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditEnterpreneurAttendanceModalComponent } from './create-or-edit-enterpreneurAttendance-modal.component';

import { ViewEnterpreneurAttendanceModalComponent } from './view-enterpreneurAttendance-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { filter as _filter } from 'lodash-es';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
  templateUrl: './enterpreneurAttendance.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
})
export class EnterpreneurAttendanceComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditEnterpreneurAttendanceModal', { static: true })
  createOrEditEnterpreneurAttendanceModal: CreateOrEditEnterpreneurAttendanceModalComponent;
  @ViewChild('viewEnterpreneurAttendanceModalComponent', { static: true })
  viewEnterpreneurAttendanceModal: ViewEnterpreneurAttendanceModalComponent;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  advancedFiltersAreShown = false;
  filterText = '';
  instructorsNameFilter = '';
  courseNameFilter: number;

  id: any;
  sorting: any;
  skipCout: any;
  maxCount: any;
  totalCount: any;
  EnterpreneurAttendance: any;
  constructor(
    injector: Injector,
    private _enterpreneurAttendanceServiceProxy: EnterpreneurAttendanceServiceProxy,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _fileDownloadService: FileDownloadService,
    private _dateTimeService: DateTimeService
  ) {
    super(injector);
  }
  ngOnInit(): void {
this.getEnterpreneurAttendance();
  }
  getEnterpreneurAttendance(event?: LazyLoadEvent){
this._enterpreneurAttendanceServiceProxy.getAll(this.filterText, this.sorting, this.skipCout, this.maxCount).subscribe(res => {
  this.totalCount = res.totalCount;
  this.EnterpreneurAttendance = res.items;
})
  }
  // getEnterpreneurAttendance(event?: LazyLoadEvent) {
  //   if (this.primengTableHelper.shouldResetPaging(event)) {
  //     this.paginator.changePage(0);
  //     if (this.primengTableHelper.records && this.primengTableHelper.records.length > 0) {
  //       return;
  //     }
  //   }

  //   this.primengTableHelper.showLoadingIndicator();

  //   this._enterpreneurAttendanceServiceProxy
  //     .getAll(
  //       this.filterText,
  //       this.instructorsNameFilter,
  //       this.courseNameFilter,
  //       0
  //     )
  //     .subscribe((result) => {
  //       this.primengTableHelper.totalRecordsCount = result.totalCount;
  //       this.primengTableHelper.records = result.items;
  //       this.primengTableHelper.hideLoadingIndicator();
  //     });
  // }

  reloadPage(): void {
    this.paginator.changePage(this.paginator.getPage());
  }

  createEnterpreneurAttendance(): void {
    this.createOrEditEnterpreneurAttendanceModal.show();
  }

  deleteEnterpreneurAttendance(enterpreneurAttendance): void {
    this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
      if (isConfirmed) {
        this._enterpreneurAttendanceServiceProxy.delete(enterpreneurAttendance.id).subscribe(() => {
          this.reloadPage();
          this.notify.success(this.l('SuccessfullyDeleted'));
        });
      }
    });
  }

  exportToExcel(): void {
    this._enterpreneurAttendanceServiceProxy
      .getEnterpreneurAttendanceToExcel(this.filterText)
      .subscribe((result) => {
        this._fileDownloadService.downloadTempFile(result);
      });
  }
}
