import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrepreneurStatesServiceProxy } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditEntrepreneurStateModalComponent } from './create-or-edit-entrepreneurState-modal.component';

import { ViewEntrepreneurStateModalComponent } from './view-entrepreneurState-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { filter as _filter } from 'lodash-es';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
  templateUrl: './entrepreneurStates.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
})
export class EntrepreneurStatesComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditEntrepreneurStateModal', { static: true })
  createOrEditEntrepreneurStateModal: CreateOrEditEntrepreneurStateModalComponent;
  @ViewChild('viewEntrepreneurStateModalComponent', { static: true })
  viewEntrepreneurStateModal: ViewEntrepreneurStateModalComponent;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  advancedFiltersAreShown = false;
  filterText = '';
  entrepreneurNameFilter = '';
  instructorsNameFilter: number;
  id: any;
  skipCout: any;
  sorting: any;
  maxCount: any;
  totalCount: any;
  EntrepreneurState: any;
  constructor(
    injector: Injector,
    private _entrepreneurStatesServiceProxy: EntrepreneurStatesServiceProxy,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _fileDownloadService: FileDownloadService,
    private _dateTimeService: DateTimeService
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.getEntrepreneurStates();
  }
  getEntrepreneurStates(event?: LazyLoadEvent) {
    this._entrepreneurStatesServiceProxy.getAll(this.filterText, this.sorting, this.biztweakRpag.skipCount, this.biztweakRpag.itemSize).subscribe(res => {
      this.totalCount = res.totalCount;
      this.EntrepreneurState = res.items;
    });
  }
  // getEntrepreneurStates(event?: LazyLoadEvent) {
  //   if (this.primengTableHelper.shouldResetPaging(event)) {
  //     this.paginator.changePage(0);
  //     if (this.primengTableHelper.records && this.primengTableHelper.records.length > 0) {
  //       return;
  //     }
  //   }

  //   this.primengTableHelper.showLoadingIndicator();

  //   this._entrepreneurStatesServiceProxy
  //     .getAll(
  //       this.filterText,
  //       this.entrepreneurNameFilter,
  //       this.instructorsNameFilter,
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

  createEntrepreneurState(id): void {
    this.createOrEditEntrepreneurStateModal.show(this.id);
  }

  deleteEntrepreneurState(entrepreneurState): void {
    this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
      if (isConfirmed) {
        this._entrepreneurStatesServiceProxy.delete(entrepreneurState.id).subscribe(() => {
          this.reloadPage();
          this.notify.success(this.l('SuccessfullyDeleted'));
        });
      }
    });
  }

  exportToExcel(): void {
    this._entrepreneurStatesServiceProxy
      .getEntrepreneurStatesToExcel(this.filterText)
      .subscribe((result) => {
        this._fileDownloadService.downloadTempFile(result);
      });
  }
}
