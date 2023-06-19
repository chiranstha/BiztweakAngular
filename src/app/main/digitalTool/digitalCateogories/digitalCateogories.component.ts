import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DigitalCateogoriesServiceProxy } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditDigitalCateogoryModalComponent } from './create-or-edit-digitalCateogory-modal.component';

import { ViewDigitalCateogoryModalComponent } from './view-digitalCateogory-modal.component';
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
  templateUrl: './digitalCateogories.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
})
export class DigitalCateogoriesComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditDigitalCateogoryModal', { static: true })
  createOrEditDigitalCateogoryModal: CreateOrEditDigitalCateogoryModalComponent;
  @ViewChild('viewDigitalCateogoryModalComponent', { static: true })
  viewDigitalCateogoryModal: ViewDigitalCateogoryModalComponent;
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  advancedFiltersAreShown = false;
  filterText = '';
  sorting:any;
  skipCout: any;
id: any;
totalCount: any;
maxCount: any;
Digitalcatagoriesdata:any;
  constructor(
    injector: Injector,
    private _digitalCateogoriesServiceProxy: DigitalCateogoriesServiceProxy,

    private _fileDownloadService: FileDownloadService,
   
  ) {
    super(injector);
  }
  ngOnInit(): void {
this.getDigitalCateogories();
  }
  getDigitalCateogories(event?: IBizTweakPaginator){
    this._digitalCateogoriesServiceProxy.getAll(this.filterText, this.sorting, this.biztweakRpag.skipCount, this.biztweakRpag.itemSize).subscribe(res => {
      this.totalCount = res.totalCount;
      this.Digitalcatagoriesdata = res.items;
      console.log('DigitalCatagories::', this.Digitalcatagoriesdata);
    })
  }
  reloadPage(): void {
    this.paginator.changePage(this.paginator.getPage());
  }

  createDigitalCateogory(): void {
    this.createOrEditDigitalCateogoryModal.show(this.id);
  }

  deleteDigitalCateogory(id: any): void {
    this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
      if (isConfirmed) {
        this._digitalCateogoriesServiceProxy.delete(id).subscribe(() => {
          this.getDigitalCateogories();
          this.notify.success(this.l('SuccessfullyDeleted'));
        });
      }
    });
  }

  exportToExcel(): void {
    this._digitalCateogoriesServiceProxy.getDigitalCateogoriesToExcel(this.filterText).subscribe((result) => {
      this._fileDownloadService.downloadTempFile(result);
    });
  }

  getDownloadUrl(id: string): string {
    return AppConsts.remoteServiceBaseUrl + '/File/DownloadBinaryFile?id=' + id;
  }
}
