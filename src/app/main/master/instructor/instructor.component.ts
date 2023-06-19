import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetInstructorsForViewDto, InstructorServiceProxy, UserTypeEnum } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditInstructorsModalComponent } from './create-or-edit-instructors-modal.component';

import { ViewInstructorsModalComponent } from './view-instructors-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { filter as _filter } from 'lodash-es';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { IBizTweakPaginator } from '@app/shared/common/paginator/paginator.component';

@Component({
  templateUrl: './instructor.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
})
export class InstructorComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditInstructorsModal', { static: true })
  createOrEditInstructorsModal: CreateOrEditInstructorsModalComponent;
  @ViewChild('viewInstructorsModalComponent', { static: true }) viewInstructorsModal: ViewInstructorsModalComponent;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  private readonly _OnDestroy$: Subject<void> = new Subject<void>();
  advancedFiltersAreShown = false;
  filterText = '';
  emailFilter = '';
  phoneFilter: number;
  industryNameFilter: number;
  id: any;
  userTypeEnum = UserTypeEnum;
  sorting: any;
  skipCout: any;
  maxCount: any;
  totalCount: any;
  InstructorData: any;
  form: FormGroup;
  instructorData: GetInstructorsForViewDto[];
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private _instructorServiceProxy: InstructorServiceProxy,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _fileDownloadService: FileDownloadService,
    private _dateTimeService: DateTimeService
  ) {
    super(injector);
  }
  ngOnInit(): void {
this.getInstructor();
this.form = new FormGroup({
  filterText: new FormControl('')
});
  }
  getInstructor(event?: IBizTweakPaginator){
    this._instructorServiceProxy.getAll(this.filterText, this.sorting, this.biztweakRpag.skipCount, this.biztweakRpag.itemSize).subscribe(res => {
    this.totalCount = res.totalCount;
    this.instructorData = res.items;
    console.log("instructorData:::", this.instructorData);
    })
  }


  reloadPage(): void {
    this.paginator.changePage(this.paginator.getPage());
  }

  createInstructors(): void {
    this.createOrEditInstructorsModal.show();
  }

  deleteInstructors(id): void {
    this.message.confirm('', 'Are you sure you want to Delete ?', (isConfirm) => {
      if (isConfirm) {
        this._instructorServiceProxy
          .delete(id)
          .pipe(takeUntil(this._OnDestroy$))
          .subscribe(() => {
            this.getInstructor();
            this.notify.success(this.l('Successfully Deleted'));
          });
      }
    });
  }
  exportToExcel(): void {
    this._instructorServiceProxy
      .getInstructorToExcel(this.filterText)
      .subscribe((result) => {
        this._fileDownloadService.downloadTempFile(result);
      });
  }
}
