import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyServiceProxy } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditCompanyModalComponent } from './create-or-edit-company-modal.component';

import { ViewCompanyModalComponent } from './view-company-modal.component';
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
  templateUrl: './company.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
})
export class CompanyComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditCompanyModal', { static: true }) createOrEditCompanyModal: CreateOrEditCompanyModalComponent;
  @ViewChild('viewCompanyModalComponent', { static: true }) viewCompanyModal: ViewCompanyModalComponent;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  advancedFiltersAreShown = false;
  filterText = '';
  entrepreneurNameFilter = '';
  industryNameFilter: any;
  sorting: any;
  skipCout: any;
  maxCount: any;
  totalCount: any;
  companyData: any;
  id: any;
  constructor(
    injector: Injector,
    private _companyServiceProxy: CompanyServiceProxy,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _fileDownloadService: FileDownloadService,
    private _dateTimeService: DateTimeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getCompany();
  }
  getCompany(event?: IBizTweakPaginator) {
    this._companyServiceProxy
      .getAll(this.filterText, this.sorting, this.biztweakRpag.skipCount, this.biztweakRpag.itemSize)
      .subscribe((res) => {
        this.totalCount = res.totalCount;
        this.companyData = res.items;
        console.log('Company Details:::', this.companyData);
      });
  }

  reloadPage(): void {
    this.paginator.changePage(this.paginator.getPage());
  }

  createCompany(): void {
    this.createOrEditCompanyModal.show(this.id);
  }

  deleteCompany(id: string): void {
    this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
      if (isConfirmed) {
        this._companyServiceProxy.delete(id).subscribe(() => {
          this.getCompany();
          this.notify.success(this.l('SuccessfullyDeleted'));
        });
      }
    });
  }

  exportToExcel(): void {
    this._companyServiceProxy.getCompanyToExcel(this.filterText).subscribe((result) => {
      this._fileDownloadService.downloadTempFile(result);
    });
  }

  getDownloadUrl(id: string): string {
    return AppConsts.remoteServiceBaseUrl + '/File/DownloadBinaryFile?id=' + id;
  }

  navigateToSubmission(id: string) {
    this.router.navigate(['/app/main/master/entrepreneurSubmitted', id]);
  }
}
