import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrepreneursServiceProxy, CoursePhaseLevel, GetEntrepreneurForViewDto } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditEntrepreneurModalComponent } from './create-or-edit-entrepreneur-modal.component';

import { ViewEntrepreneurModalComponent } from './view-entrepreneur-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { filter as _filter } from 'lodash-es';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { IBizTweakPaginator } from '@app/shared/common/paginator/paginator.component';

@Component({
  templateUrl: './entrepreneurs.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
})
export class EntrepreneursComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditEntrepreneurModal', { static: true })
  createOrEditEntrepreneurModal: CreateOrEditEntrepreneurModalComponent;
  @ViewChild('viewEntrepreneurModalComponent', { static: true }) viewEntrepreneurModal: ViewEntrepreneurModalComponent;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  advancedFiltersAreShown = false;
  filterText = '';
  qualificationFilter = '';
  emailFilter: number;
  phoneFilter: number;
  industryNameFilter = '';
  bankNameFilter = '';
  instructorsNameFilter = '';
id: any;
  coursePhaseLevel = CoursePhaseLevel;
  sorting: any;
  skipCout: any;
  totalCount: any;
  entrepreneurdata: GetEntrepreneurForViewDto[];
  maxCount: any;
  constructor(
    injector: Injector,
    private _entrepreneursServiceProxy: EntrepreneursServiceProxy,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _fileDownloadService: FileDownloadService,
    private _dateTimeService: DateTimeService
  ) {
    super(injector);
  }
  ngOnInit(): void {
this.getEntrepreneurs();
  }
  getEntrepreneurs(event?: IBizTweakPaginator){
    this._entrepreneursServiceProxy.getAll(this.filterText, this.sorting, this.biztweakRpag.skipCount, this.biztweakRpag.itemSize).subscribe(res => {
      this.totalCount = res.totalCount;
      this.entrepreneurdata = res.items;
      console.log('entrepreneurdata', this.entrepreneurdata);
    })
  }
 

  reloadPage(): void {
    this.paginator.changePage(this.paginator.getPage());
  }

  createEntrepreneur(): void {
    this.createOrEditEntrepreneurModal.show(this.id);
  }

  deleteEntrepreneur(id): void {
    this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
      if (isConfirmed) {
        this._entrepreneursServiceProxy.delete(id).subscribe(() => {
          this.reloadPage();
          this.notify.success(this.l('SuccessfullyDeleted'));
        });
      }
    });
  }

  exportToExcel(): void {
    this._entrepreneursServiceProxy
      .getEntrepreneursToExcel(
        this.filterText,
      )
      .subscribe((result) => {
        this._fileDownloadService.downloadTempFile(result);
      });
  }
}
