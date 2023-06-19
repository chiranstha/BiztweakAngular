import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CourseSectionsServiceProxy, LessionTypeEnum, LessonCourseSectionTableDto } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';
import { CreateOrEditSectionModalComponent } from './create-or-edit-section-modal.component';
@Component({
  selector: 'createOrEditCourseDescriptionModal',
  templateUrl: './create-or-edit-coursedescription-modal.component.html'
})
export class CreateOrEditCoursedescriptionModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('createOrEditSectionModal') createOrEditSectionModal: CreateOrEditSectionModalComponent;
  saving = false;
  active = false;
  form: FormGroup;
  courseId: any;
  id: any;
  public destroy$ = new Subject<void>();
  lessionTypeMapping: Record<LessionTypeEnum, string> = {
    [LessionTypeEnum.YouTubeVideo]: 'YouTubeVideo',
    [LessionTypeEnum.Text]: 'Text',
    [LessionTypeEnum.VimeoVideo]: 'VimeoVideo',
    [LessionTypeEnum.Videofile]: 'Videofile',
    [LessionTypeEnum.Videofile]: 'Videofile',
    [LessionTypeEnum.AmazonBucket]: 'AmazonBucket',
    [LessionTypeEnum.GoogledriveVideo]: 'GoogledriveVideo',
    [LessionTypeEnum.DocumentFile]: 'DocumentFile',
    [LessionTypeEnum.ImageFile]: 'ImageFile',
    [LessionTypeEnum.IframeEmbed]: 'IframeEmbed',
    [LessionTypeEnum.Videourl]: 'Vedio Url',
  };
  lessontype = Object.values(LessionTypeEnum).filter((value) => typeof value === 'number');
  section$: Observable<LessonCourseSectionTableDto[]>;
  constructor(private injector: Injector, private proxy: CourseSectionsServiceProxy,
    private route: ActivatedRoute, private fb: FormBuilder) {
    super(injector);
  }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.createForm();
    this.courseId = this.createOrEditSectionModal.courseId;
    // this.getSectionDropdown();
  }
  createForm(item: any = {}) {
    this.form = this.fb.group({
      id: [item.id ? item.id : this.emptyguId],
      name: [item.name ? item.name : '', Validators.required],
      duration: [item.duration ? item.duration : '', Validators.required],
      lessionType: [item.lessionType ? item.lessionType : '', Validators.required],
      videoUrl: [item.videoUrl ? item.videoUrl : '', Validators.required],
      summary: [item.summary ? item.summary : '', Validators.required],
      isFreeLesson: [item.isFreeLesson ? item.isFreeLesson : false],
      order: [item.order ? item.order : '', Validators.required],
      attachment: [item.attachment ? item.attachment : ''],
      attachmentToken: [item.attachmentToken ? item.attachmentToken : ''],
      caption: [item.caption ? item.caption : '', Validators.required],
      cloudVideoId: [item.cloudVideoId ? item.cloudVideoId : ''],
      courseSectionId: [item.courseSectionId ? item.courseSectionId : '', Validators.required]
    });
  }
  getSectionDropdown(courseId) {
    // this.section$ = this.proxy.getAllCourseSectionDropdown(this.courseId.id);
    this.section$ = this.proxy.getAllCourseSectionDropdown(courseId);
    this.notify.error(courseId);
  }
  save(): void {
    this.saving = true;

    this.proxy
      .createOrEditLesson(this.form.getRawValue())
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.close();
        this.modalSave.emit(null);
      });
  }
  // if (this.form.valid) {
  //   this.proxy.createOrEditLesson(this.form.getRawValue()).subscribe(() => {
  //     this.active = false;
  //     this.modal.hide();
  //     this.modalSave.emit(null);
  //     this.notify.success('Saved Successfully');
  //   });
  // } else {
  //   this.saving = false;
  //   this.notify.error('Form is invalid!!');
  // }

  show(courseId: string) {
    this.active = true;
    this.modal.show();
    this.getSectionDropdown(courseId);
  }
  showEdit(id: string): void {
    this.active = true;
    this.modal.show();
    this.proxy
      .getLessonForEdit(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.createForm(result);
      });
  }
  close(): void {
    this.active = false;
    this.modal.hide();
    this.form.reset();
    this.modalSave.emit(null);
  }
}
