import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CoursesServiceProxy,
  IntroductionVideoType,
  CoursePhaseLevel,
} from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditCourseModalComponent } from './create-or-edit-course-modal.component';

import { ViewCourseModalComponent } from './view-course-modal.component';
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
  templateUrl: './courses.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
})
export class CoursesComponent extends AppComponentBase implements OnInit{
  @ViewChild('createOrEditCourseModal', { static: true }) createOrEditCourseModal: CreateOrEditCourseModalComponent;
  @ViewChild('viewCourseModalComponent', { static: true }) viewCourseModal: ViewCourseModalComponent;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  advancedFiltersAreShown = false;
  filterText = '';
  maxEndDateFilter: DateTime;
  minEndDateFilter: DateTime;
  startTimeFilter = '';
  endTimeFilter: any;
  courseCategoryNameFilter = '';
  courseData: any;
  introductionVideoType = IntroductionVideoType;
  coursePhaseLevel = CoursePhaseLevel;
  sorting: any;
  skipCout: any;
  maxCount: any;
  totalCount: any;
  constructor(
    injector: Injector,
    private _coursesServiceProxy: CoursesServiceProxy,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _fileDownloadService: FileDownloadService,
    private _dateTimeService: DateTimeService
  ) {
    super(injector);
  }
  ngOnInit(): void {
   this.getCourses();
  }
getCourses(event?: IBizTweakPaginator){
  this._coursesServiceProxy.getAll(this.filterText, this.sorting, this.biztweakRpag.skipCount, this.biztweakRpag.itemSize).subscribe(res => {
   this.totalCount  = res.totalCount;
    this.courseData = res.items;
    console.log('CourseData::', this.courseData);
  });
}
  // getCourses(event?: LazyLoadEvent) {
  //   if (this.primengTableHelper.shouldResetPaging(event)) {
  //     this.paginator.changePage(0);
  //     if (this.primengTableHelper.records && this.primengTableHelper.records.length > 0) {
  //       return;
  //     }
  //   }
  //   this.primengTableHelper.showLoadingIndicator();

  //   this._coursesServiceProxy
  //     .getAll(
  //       this.filterText,
  //       this.startTimeFilter,
  //       this.endTimeFilter,
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

  createCourse(): void {
    this.createOrEditCourseModal.show('');
  }

  deleteCourse(id): void {
    this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
      if (isConfirmed) {
        this._coursesServiceProxy.delete(id).subscribe(() => {
          this.reloadPage();
          this.notify.success(this.l('SuccessfullyDeleted'));
          this.getCourses();
        });
      }
    });
  }

  exportToExcel(): void {
    this._coursesServiceProxy
      .getCoursesToExcel(
        this.filterText,
      )
      .subscribe((result) => {
        this._fileDownloadService.downloadTempFile(result);
      });
  }

  getDownloadUrl(id: string): string {
    return AppConsts.remoteServiceBaseUrl + '/File/DownloadBinaryFile?id=' + id;
  }
}
