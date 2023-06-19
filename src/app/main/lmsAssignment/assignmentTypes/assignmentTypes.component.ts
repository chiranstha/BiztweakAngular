import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentTypesServiceProxy, GetAssignmentTypeForViewDto } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditAssignmentTypeModalComponent } from './create-or-edit-assignmentType-modal.component';

import { ViewAssignmentTypeModalComponent } from './view-assignmentType-modal.component';
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
  templateUrl: './assignmentTypes.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
})
export class AssignmentTypesComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditAssignmentTypeModal', { static: true })
  createOrEditAssignmentTypeModal: CreateOrEditAssignmentTypeModalComponent;
  @ViewChild('viewAssignmentTypeModalComponent', { static: true })
  viewAssignmentTypeModal: ViewAssignmentTypeModalComponent;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  advancedFiltersAreShown = false;
  filterText = '';
  totalcount: any;
  sorting: any;
  AssignmentType: GetAssignmentTypeForViewDto[];
  constructor(
    injector: Injector,
    private _assignmentTypesServiceProxy: AssignmentTypesServiceProxy,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _fileDownloadService: FileDownloadService,
    private _dateTimeService: DateTimeService
  ) {
    super(injector);
  }
  ngOnInit(): void {
 this.getAssignmentTypes();
  }

  getAssignmentTypes(event?: IBizTweakPaginator){
    this._assignmentTypesServiceProxy.getAll(this.filterText, this.sorting, this.biztweakRpag.skipCount, this.biztweakRpag.itemSize).subscribe(res => {
      this.totalcount = res.totalCount;
      this.AssignmentType = res.items;
    });
  }


  createAssignmentType(): void {
    this.createOrEditAssignmentTypeModal.show();
  }

  deleteAssignmentType(assignmentId: string): void {
    this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
      if (isConfirmed) {
        this._assignmentTypesServiceProxy.delete(assignmentId).subscribe(() => {
          this.getAssignmentTypes();
          this.notify.success(this.l('SuccessfullyDeleted'));
        });
      }
    });
  }
}
