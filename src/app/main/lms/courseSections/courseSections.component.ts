import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseSectionsServiceProxy } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditCourseSectionModalComponent } from './create-or-edit-courseSection-modal.component';

import { ViewCourseSectionModalComponent } from './view-courseSection-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { filter as _filter } from 'lodash-es';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { finalize } from 'rxjs';

@Component({
  templateUrl: './courseSections.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
})
export class CourseSectionsComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditCourseSectionModal', { static: true })
  createOrEditCourseSectionModal: CreateOrEditCourseSectionModalComponent;
  @ViewChild('viewCourseSectionModalComponent', { static: true })
  viewCourseSectionModal: ViewCourseSectionModalComponent;

  sorting: any;
  skipCout: any;
  maxCount: any;
  totalCount: any;
  courseSectionData: any;
  filterText: any;
  constructor(
    injector: Injector,
    private _courseSectionsServiceProxy: CourseSectionsServiceProxy,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _fileDownloadService: FileDownloadService,
    private _dateTimeService: DateTimeService
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.getCourseSections();
  }
  getCourseSections(event?: LazyLoadEvent) {

    this.primengTableHelper.showLoadingIndicator();
    this._courseSectionsServiceProxy.getAll(this.filterText, this.sorting, this.biztweakRpag.skipCount, this.biztweakRpag.itemSize).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
    .subscribe((result) => {
        this.primengTableHelper.records = result.items;
        this.primengTableHelper.totalRecordsCount = result.items.length;
        this.primengTableHelper.hideLoadingIndicator();
    });
  }

  createCourseSection(): void {
    this.createOrEditCourseSectionModal.show();

  }

  deleteCourseSection(courseSection): void {
    this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
      if (isConfirmed) {
        this._courseSectionsServiceProxy.deleteSection(courseSection.id).subscribe(() => {
          this.getCourseSections();
          this.notify.success(this.l('SuccessfullyDeleted'));
        });
      }
    });
  }

  exportToExcel(): void {
    this._courseSectionsServiceProxy
      .getCourseSectionsToExcel(this.filterText)
      .subscribe((result) => {
        this._fileDownloadService.downloadTempFile(result);
      });
  }
}
