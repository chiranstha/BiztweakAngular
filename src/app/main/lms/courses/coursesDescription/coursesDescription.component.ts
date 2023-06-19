import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseDetailDtoForGetAll, CourseSectionsServiceProxy, LessionTypeEnum } from '@shared/service-proxies/service-proxies';
import { CreateOrEditCoursedescriptionModalComponent } from './create-or-edit-coursedescription-modal.component';
import { CreateOrEditSectionModalComponent } from './create-or-edit-section-modal.component';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-coursesDescription',
  templateUrl: './coursesDescription.component.html',
  styleUrls: ['./coursesDescription.component.css']
})
export class CoursesDescriptionComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditCourseDescriptionModal', { static: true }) createOrEditCourseDescriptionModal: CreateOrEditCoursedescriptionModalComponent;
  @ViewChild('createOrEditSectionModal', { static: true }) createOrEditSectionModal: CreateOrEditSectionModalComponent;
  id: any;
course: CourseDetailDtoForGetAll;
courseId: any;
selectedCourseId: any;
lessionTypeMapping: Record<LessionTypeEnum, string> = {
  [LessionTypeEnum.YouTubeVideo]: 'YouTubeVideo',
  [LessionTypeEnum.Text]: 'Text',
  [LessionTypeEnum.VimeoVideo]: 'VimeoVideo',
  [LessionTypeEnum.Videofile]: 'Videofile',
  [LessionTypeEnum.AmazonBucket]: 'AmazonBucket',
  [LessionTypeEnum.GoogledriveVideo]: 'GoogledriveVideo',
  [LessionTypeEnum.DocumentFile]: 'DocumentFile',
  [LessionTypeEnum.ImageFile]: 'Image',
  [LessionTypeEnum.IframeEmbed]: 'IframeEmbed',
  [LessionTypeEnum.Videourl]: 'Vedio Url',
};
private readonly _OnDestroy$: Subject<void> = new Subject<void>();


// lessionTypeMapping: any;
  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private _proxy: CourseSectionsServiceProxy
  ) {
    super(injector);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getCourseDetail();
  }
getCourseDetail(){
  this._proxy.getCourseDetail(this.id).subscribe(res => {
    this.course = res;
    console.log('Course:::', this.course);
  });
}
deleteLesson(id) {
  this.message.confirm('', 'Are you sure you want to Delete ?', (isConfirm) => {
    if (isConfirm) {
      this._proxy
        .deleteLesson(id)
        .pipe(takeUntil(this._OnDestroy$))
        .subscribe(() => {
          this.getCourseDetail();
          this.notify.success(this.l('Successfully Deleted'));
        });
    }
  });
}
deleteSection(id) {
  this.message.confirm('', 'Are you sure you want to Delete ?', (isConfirm) => {
    if (isConfirm) {
      this._proxy
        .deleteSection(id)
        .pipe(takeUntil(this._OnDestroy$))
        .subscribe(() => {
          this.getCourseDetail();
          this.notify.success(this.l('Successfully Deleted'));
        });
    }
  });
}
}
