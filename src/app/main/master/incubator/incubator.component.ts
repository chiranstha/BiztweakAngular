import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncubatorServiceProxy, } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditIncubatorModalComponent } from './create-or-edit-incubator-modal.component';

import { ViewIncubatorModalComponent } from './view-incubator-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { filter as _filter } from 'lodash-es';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { Subject, takeUntil } from 'rxjs';
import { IBizTweakPaginator } from '@app/shared/common/paginator/paginator.component';

@Component({
  templateUrl: './incubator.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
})
export class IncubatorComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditIncubatorModal', { static: true })
  createOrEditIncubatorModal: CreateOrEditIncubatorModalComponent;
  @ViewChild('viewIncubatorModalComponent', { static: true }) viewIncubatorModal: ViewIncubatorModalComponent;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  advancedFiltersAreShown = false;
  filterText = '';
  industryNameFilter = '';
  sorting: any;
  skipCout: any;
  maxCount: any;
  totalCount: any;
  incubatorData: any;
  id: any;
  private readonly _OnDestroy$: Subject<void> = new Subject<void>();
  constructor(
    injector: Injector,
    private _incubatorServiceProxy: IncubatorServiceProxy,
  ) {
    super(injector);
  }
  ngOnInit(): void {
   this.getIncubator();
  }
getIncubator(event?: IBizTweakPaginator){
  this._incubatorServiceProxy.getAll(this.filterText, this.industryNameFilter,this.sorting,  this.biztweakRpag.skipCount,  this.biztweakRpag.itemSize).subscribe(res => {
  this.totalCount = res.totalCount;
  this.incubatorData = res.items;
  console.log("incubatorData:::", this.incubatorData);
  })
}

  reloadPage(): void {
    this.paginator.changePage(this.paginator.getPage());
  }

  createIncubator(): void {
    this.createOrEditIncubatorModal.show();
  }

  deleteIncubator(id) {
    this.message.confirm('', 'Are you sure you want to Delete ?', (isConfirm) => {
      if (isConfirm) {
        this._incubatorServiceProxy
          .delete(id)
          .pipe(takeUntil(this._OnDestroy$))
          .subscribe(() => {
            this.getIncubator();
            this.notify.success(this.l('Successfully Deleted'));
          });
      }
    });
  }

  getDownloadUrl(id: string): string {
    return AppConsts.remoteServiceBaseUrl + '/File/DownloadBinaryFile?id=' + id;
  }
}
