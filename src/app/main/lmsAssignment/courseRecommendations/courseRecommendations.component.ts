import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseRecommendationsServiceProxy } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditCourseRecommendationModalComponent } from './create-or-edit-courseRecommendation-modal.component';
import { ViewCourseRecommendationModalComponent } from './view-courseRecommendation-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { filter as _filter } from 'lodash-es';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
  templateUrl: './courseRecommendations.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
})
export class CourseRecommendationsComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditCourseRecommendationModal', { static: true })
  createOrEditCourseRecommendationModal: CreateOrEditCourseRecommendationModalComponent;
  @ViewChild('viewCourseRecommendationModalComponent', { static: true })
  viewCourseRecommendationModal: ViewCourseRecommendationModalComponent;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  advancedFiltersAreShown = false;
  filterText = '';
  assignmentId: string;
  sorting: any;
  skipCout: any;
  maxCount: any;
  totalCount: any;
  recommendation: any;
  constructor(
    injector: Injector,
    private _courseRecommendationsServiceProxy: CourseRecommendationsServiceProxy,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _fileDownloadService: FileDownloadService,
    private _dateTimeService: DateTimeService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.assignmentId = this._activatedRoute.snapshot.params['assignmentId'];
    this.getCourseRecommendations();
  }
  getCourseRecommendations(){
    this._courseRecommendationsServiceProxy.getAll(this.assignmentId, this.filterText, this.sorting, this.biztweakRpag.skipCount, this.biztweakRpag.itemSize, ).subscribe(res => {
      this.totalCount = res.totalCount;
      this.recommendation = res.items;
    });
  }

  reloadPage(): void {
    this.paginator.changePage(this.paginator.getPage());
  }

  createCourseRecommendation(): void {
    this.createOrEditCourseRecommendationModal.show(this.assignmentId);
  }

  deleteCourseRecommendation(id): void {
    this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
      if (isConfirmed) {
        this._courseRecommendationsServiceProxy.delete(id).subscribe(() => {
          this.getCourseRecommendations();
          this.notify.success(this.l('SuccessfullyDeleted'));
        });
      }
    });
  }

  exportToExcel(): void {
    this._courseRecommendationsServiceProxy
      .getCourseRecommendationsToExcel(this.filterText, )
      .subscribe((result) => {
        this._fileDownloadService.downloadTempFile(result);
      });
  }
}
