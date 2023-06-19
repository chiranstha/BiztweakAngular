import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { LessonsServiceProxy, LessionTypeEnum } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateOrEditLessonModalComponent } from './create-or-edit-lesson-modal.component';

import { ViewLessonModalComponent } from './view-lesson-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { filter as _filter } from 'lodash-es';


@Component({
  templateUrl: './lessons.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
})
export class LessonsComponent extends AppComponentBase  implements OnInit{
  @ViewChild('createOrEditLessonModal', { static: true }) createOrEditLessonModal: CreateOrEditLessonModalComponent;
  @ViewChild('viewLessonModalComponent', { static: true }) viewLessonModal: ViewLessonModalComponent;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  advancedFiltersAreShown = false;
  filterText = '';
  summaryFilter = '';
  courseSectionNameFilter = '';

  lessionTypeEnum = LessionTypeEnum;
  sorting:any;
  skipCout: any;
  maxCount: any;
  totalcount: any;
  lessondata: any;
  constructor(
    injector: Injector,
    private _lessonsServiceProxy: LessonsServiceProxy,
    private _fileDownloadService: FileDownloadService,
 
  ) {
    super(injector);
  }
  ngOnInit(): void {
   this.getLessons();
  }
  getLessons(event?: LazyLoadEvent){
    this._lessonsServiceProxy.getAll(this.filterText, this.sorting, this.biztweakRpag.skipCount, this.biztweakRpag.itemSize).subscribe((res) => {
      this.totalcount = res.totalCount;
      this.lessondata = res.items;
    })
  }
  // getLessons(event?: LazyLoadEvent) {
  //   if (this.primengTableHelper.shouldResetPaging(event)) {
  //     this.paginator.changePage(0);
  //     if (this.primengTableHelper.records && this.primengTableHelper.records.length > 0) {
  //       return;
  //     }
  //   }

  //   this.primengTableHelper.showLoadingIndicator();

  //   this._lessonsServiceProxy
  //     .getAll(
  //       this.filterText,
  //       this.primengTableHelper.getSorting(this.dataTable),
  //       this.primengTableHelper.getSkipCount(this.paginator, event),
  //       this.primengTableHelper.getMaxResultCount(this.paginator, event)
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

  createLesson(): void {
    this.createOrEditLessonModal.show();
  }

  deleteLesson(lesson: string): void {
    this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
      if (isConfirmed) {
        this._lessonsServiceProxy.delete(lesson).subscribe(() => {
          this.reloadPage();
          this.notify.success(this.l('SuccessfullyDeleted'));
        });
      }
    });
  }

  exportToExcel(): void {
    this._lessonsServiceProxy
      .getLessonsToExcel(this.filterText)
      .subscribe((result) => {
        this._fileDownloadService.downloadTempFile(result);
      });
  }

  getDownloadUrl(id: string): string {
    return AppConsts.remoteServiceBaseUrl + '/File/DownloadBinaryFile?id=' + id;
  }
}
