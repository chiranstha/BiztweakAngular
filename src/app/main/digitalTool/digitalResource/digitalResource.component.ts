import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DigitalResourceServiceProxy } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditDigitalResourceModalComponent } from './create-or-edit-digitalResource-modal.component';

import { ViewDigitalResourceModalComponent } from './view-digitalResource-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { filter as _filter } from 'lodash-es';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
  templateUrl: './digitalResource.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
})
export class DigitalResourceComponent extends AppComponentBase implements OnInit{
  @ViewChild('createOrEditDigitalResourceModal', { static: true })
  createOrEditDigitalResourceModal: CreateOrEditDigitalResourceModalComponent;
  @ViewChild('viewDigitalResourceModalComponent', { static: true })
  viewDigitalResourceModal: ViewDigitalResourceModalComponent;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  advancedFiltersAreShown = false;
  filterText = '';
  digitalCateogoryNameFilter = '';
id: any;
sorting: any;
skipCout: any;
maxCount: any;
totalCount: any;
digitalcatagoriesData: any;
  constructor(
    injector: Injector,
    private _digitalResourceServiceProxy: DigitalResourceServiceProxy,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _fileDownloadService: FileDownloadService,
    private _dateTimeService: DateTimeService
  ) {
    super(injector);
  }
  ngOnInit(): void {
   this.getDigitalResource();
  }
  getDigitalResource(event?: LazyLoadEvent){
    this._digitalResourceServiceProxy.getAll(this.filterText, this.sorting, this.biztweakRpag.skipCount, this.biztweakRpag.itemSize).subscribe(res => {
      this.totalCount = res.totalCount;
      this.digitalcatagoriesData = res.items;
    })
  }
  // getDigitalResource(event?: LazyLoadEvent) {
  //   if (this.primengTableHelper.shouldResetPaging(event)) {
  //     this.paginator.changePage(0);
  //     if (this.primengTableHelper.records && this.primengTableHelper.records.length > 0) {
  //       return;
  //     }
  //   }

  //   this.primengTableHelper.showLoadingIndicator();

  //   this._digitalResourceServiceProxy
  //     .getAll(
  //       this.filterText,
  //       this.digitalCateogoryNameFilter,
  //       this.primengTableHelper.getSkipCount(this.paginator, event),
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

  createDigitalResource(): void {
    this.createOrEditDigitalResourceModal.show(this.id);
  }

  deleteDigitalResource(digitalResource): void {
    this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
      if (isConfirmed) {
        this._digitalResourceServiceProxy.delete(digitalResource.id).subscribe(() => {
          this.reloadPage();
          this.notify.success(this.l('SuccessfullyDeleted'));
        });
      }
    });
  }

  exportToExcel(): void {
    this._digitalResourceServiceProxy
      .getDigitalResourceToExcel(this.filterText)
      .subscribe((result) => {
        this._fileDownloadService.downloadTempFile(result);
      });
  }

  getDownloadUrl(id: string): string {
    return AppConsts.remoteServiceBaseUrl + '/File/DownloadBinaryFile?id=' + id;
  }
}
