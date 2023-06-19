import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BankServiceProxy } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditBankModalComponent } from './create-or-edit-bank-modal.component';

import { ViewBankModalComponent } from './view-bank-modal.component';
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
  templateUrl: './bank.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
})
export class BankComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditBankModal', { static: true }) createOrEditBankModal: CreateOrEditBankModalComponent;
  @ViewChild('viewBankModalComponent', { static: true }) viewBankModal: ViewBankModalComponent;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  private readonly _OnDestroy$: Subject<void> = new Subject<void>();
  advancedFiltersAreShown = false;
  filterText = '';
id: any;
sorting: any;
skipCout: any;
maxCount: any;
totalCount: any;
bankData: any;
  constructor(
    injector: Injector,
    private _bankServiceProxy: BankServiceProxy,
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.getBank();
  }
getBank(event?: IBizTweakPaginator){
  this._bankServiceProxy.getAll(this.filterText, this.sorting, this.biztweakRpag.skipCount, this.biztweakRpag.itemSize).subscribe(res => {
    this.totalCount = res.totalCount;
    this.bankData = res.items;
  })
}
  

  reloadPage(): void {
    this.paginator.changePage(this.paginator.getPage());
  }

  createBank(): void {
    this.createOrEditBankModal.show();
  }
  deleteBank(id) {
    this.message.confirm('', 'Are you sure you want to Delete ?', (isConfirm) => {
      if (isConfirm) {
        this._bankServiceProxy
          .delete(id)
          .pipe(takeUntil(this._OnDestroy$))
          .subscribe(() => {
            this.getBank();
            this.notify.success(this.l('Successfully Deleted'));
          });
      }
    });
  }
  // exportToExcel(): void {
  //   this._bankServiceProxy.getBankToExcel(this.filterText).subscribe((result) => {
  //     this._fileDownloadService.downloadTempFile(result);
  //   });
  // }
}
