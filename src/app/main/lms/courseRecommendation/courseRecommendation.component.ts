import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IBizTweakPaginator } from '@app/shared/common/paginator/paginator.component';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { UserTypeEnum, GetInstructorsForViewDto, InstructorServiceProxy, TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { NotifyService } from 'abp-ng2-module';
import { Subject, takeUntil } from 'rxjs';
import { courseRecommendationModalComponent } from './courseRecommendation-modal.component';

@Component({
  selector: 'app-courseRecommendation',
  templateUrl: './courseRecommendation.component.html',
  styleUrls: ['./courseRecommendation.component.css']
})
export class CourseRecommendationComponent extends AppComponentBase implements OnInit {
  @ViewChild('courserecommendationModal', { static: true })
  courserecommendationModal: courseRecommendationModalComponent;
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
  createNewRecommendation(){
    this.courserecommendationModal.show();
  }
  // createNewJobs(){
  //   this.jobSectionModal.show();
  // }
  // reloadPage(): void {
  //   this.paginator.changePage(this.paginator.getPage());
  // }

  // createInstructors(): void {
  //   this.createOrEditInstructorsModal.show();
  // }

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
