import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnterpreneurAssigmentServiceProxy, EnterpreneurAssigmentDto } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditEnterpreneurAssigmentModalComponent } from './create-or-edit-enterpreneurAssigment-modal.component';

import { ViewEnterpreneurAssigmentModalComponent } from './view-enterpreneurAssigment-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { filter as _filter } from 'lodash-es';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
  templateUrl: './enterpreneurAssigment.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
})
export class EnterpreneurAssigmentComponent extends AppComponentBase {
  @ViewChild('createOrEditEnterpreneurAssigmentModal', { static: true })
  createOrEditEnterpreneurAssigmentModal: CreateOrEditEnterpreneurAssigmentModalComponent;
  @ViewChild('viewEnterpreneurAssigmentModalComponent', { static: true })
  viewEnterpreneurAssigmentModal: ViewEnterpreneurAssigmentModalComponent;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  advancedFiltersAreShown = false;
  filterText = '';
  assignmentNameFilter = '';
  assignmentOptionNameFilter = '';
  entrepreneurNameFilter = '';

  constructor(
    injector: Injector,
    private _enterpreneurAssigmentServiceProxy: EnterpreneurAssigmentServiceProxy,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _fileDownloadService: FileDownloadService,
    private _dateTimeService: DateTimeService
  ) {
    super(injector);
  }

  getEnterpreneurAssigment(event?: LazyLoadEvent) {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      if (this.primengTableHelper.records && this.primengTableHelper.records.length > 0) {
        return;
      }
    }

    this.primengTableHelper.showLoadingIndicator();

    this._enterpreneurAssigmentServiceProxy
      .getAll(
        this.filterText,
        this.assignmentNameFilter,
        this.assignmentOptionNameFilter,
        this.entrepreneurNameFilter,
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

  createEnterpreneurAssigment(): void {
    this.createOrEditEnterpreneurAssigmentModal.show();
  }

  deleteEnterpreneurAssigment(enterpreneurAssigment: EnterpreneurAssigmentDto): void {
    this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
      if (isConfirmed) {
        this._enterpreneurAssigmentServiceProxy.delete(enterpreneurAssigment.id).subscribe(() => {
          this.reloadPage();
          this.notify.success(this.l('SuccessfullyDeleted'));
        });
      }
    });
  }

  exportToExcel(): void {
    this._enterpreneurAssigmentServiceProxy
      .getEnterpreneurAssigmentToExcel(
        this.filterText,
        this.assignmentNameFilter,
        this.assignmentOptionNameFilter,
        this.entrepreneurNameFilter
      )
      .subscribe((result) => {
        this._fileDownloadService.downloadTempFile(result);
      });
  }
}
