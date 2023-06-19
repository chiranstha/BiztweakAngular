import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize, takeUntil } from 'rxjs/operators';
import {
  CourseCourseCategoryTableDto,
  CoursesServiceProxy,
  CreateOrEditCourseDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { CourseCourseCategoryLookupTableModalComponent } from './course-courseCategory-lookup-table-modal.component';
import { FileItem, FileUploader, FileUploaderOptions } from '@node_modules/ng2-file-upload';
import { IAjaxResponse, TokenService } from '@node_modules/abp-ng2-module';
import { AppConsts } from '@shared/AppConsts';

import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'createOrEditCourseModal',
  templateUrl: './create-or-edit-course-modal.component.html',
})
export class CreateOrEditCourseModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('uploadProfilePictureInputLabel') uploadProfilePictureInputLabel: ElementRef;
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @ViewChild('Course_courseImageLabel') course_courseImageLabel: ElementRef;
  @ViewChild('courseCourseCategoryLookupTableModal', { static: true })
  courseCourseCategoryLookupTableModal: CourseCourseCategoryLookupTableModalComponent;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;

  public uploader: FileUploader;
  description: string;

  courseCategoryName = '';
  imageChangedEvent: any = '';
  courseImageFileUploader: FileUploader;
  courseImageFileToken: string;
  courseImageUrl: string;
  courseImageFileAcceptedTypes = '';
  public maxProfilPictureBytesUserFriendlyValue = 5;
  filter: any;
  sorting: any;
  skipCount: any;
  maxResultCount: any;
  id: any;
  category$: Observable<CourseCourseCategoryTableDto[]>;
  startDate: DateTime;
  endDate: DateTime;
  public destroy$ = new Subject<void>();
  form: FormGroup;
  private _uploaderOptions: FileUploaderOptions = {};
  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _coursesServiceProxy: CoursesServiceProxy,
    private _dateTimeService: DateTimeService,
    private _tokenService: TokenService,
    private _http: HttpClient
  ) {
    super(injector);
  }



  save(): void {
    this.saving = true;
    this.form.get('startDate').setValue(this.startDate.toString());
    this.form.get('endDate').setValue(this.endDate.toString());
    this._coursesServiceProxy
      .createOrEdit(this.form.value)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.close();
        this.form.reset();
        this.modalSave.emit(null);
      });
  }

  show(id: string): void {
    this.active = true;
    this.modal.show();
  }
 
  showEdit(id: string): void {
    this.active = true;
    this.modal.show();
    this._coursesServiceProxy
      .getCourseForEdit(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.createForm(result);
      });
  }

  removeCourseImageFile( id: string): void {
    this.message.confirm(this.l('DoYouWantToRemoveTheFile'), this.l('AreYouSure'), (isConfirmed) => {
      if (isConfirmed) {
        this._coursesServiceProxy.removeCourseImageFile(id).subscribe(() => {
          abp.notify.success(this.l('SuccessfullyDeleted'));
          this.courseImageUrl = null;
        });
      }
    });
  }



  getDownloadUrl(id: string): string {
    return AppConsts.remoteServiceBaseUrl + '/File/DownloadBinaryFile?id=' + id;
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.createForm();
    this.getCatagory();
    this.initFileUploader();
  }
  createForm(item: any = {}) {
    this.form = this.fb.group({
      id: [item.id ? item.id : this.emptyguId],
      courseCategoryId: [item.courseCategoryId, Validators.required],
      name: [item.name ? item.name : '', Validators.required],
      description: [item.description ? item.description : '', Validators.required],
      courseImageUrl: [item.courseImageUrl ? item.courseImageUrl : ''],
      courseImageToken: [item.courseImageToken],
      introductionVideoType: [item.introductionVideoType ? item.introductionVideoType : '', Validators.required],
      startDate: [item.startDate ? item.startDate : '', Validators.required],
      endDate: [item.endDate ? item.endDate : '', Validators.required],
      startTime: [item.startTime ? item.startTime : '', Validators.required],
      endTime: [item.endTime ? item.endTime : '', Validators.required],
      coursePhaseLevel: [item.coursePhaseLevel ? item.coursePhaseLevel : '', Validators.required],
    });
  }

  imageCroppedFile(event: ImageCroppedEvent) {
    this.uploader.clearQueue();
    this.uploader.addToQueue([<File>base64ToFile(event.base64)]);
  }
  getCatagory() {
    this.category$ = this._coursesServiceProxy.getAllCourseCategoryForTable();
  }

  ///file upload

  guid(): string {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

  initFileUploader(): void {
    this.uploader = new FileUploader({ url: AppConsts.remoteServiceBaseUrl + '/Profile/UploadProfilePicture' });
    this._uploaderOptions.autoUpload = false;
    this._uploaderOptions.authToken = 'Bearer ' + this._tokenService.getToken();
    this._uploaderOptions.removeAfterUpload = true;
    this.uploader.onAfterAddingFile = (file) => {
        file.withCredentials = false;
    };

    let token =  this.guid();
    this.uploader.onBuildItemForm = (fileItem: FileItem, form: any) => {
        form.append('FileType', fileItem.file.type);
        form.append('FileName', fileItem.file.name);
        form.append('FileToken', token);
    };

    this.uploader.onSuccessItem = (item, response, status) => {
        const resp = <IAjaxResponse>JSON.parse(response);
        if (resp.success) {
          //  this.updateProfilePicture(token);
          this.notify.success(this.l('SavedSuccessfully'));
          this.form.get('courseImageToken').setValue(token);
        } else {
            this.message.error(resp.error.message);
        }
    };

    this.uploader.setOptions(this._uploaderOptions);
}



  fileChangeEvent(event: any): void {
    if (event.target.files[0].size > 5242880) {      //5MB
      this.message.warn(this.l('ProfilePicture_Warn_SizeLimit', this.maxProfilPictureBytesUserFriendlyValue));
      return;
    }

    this.uploadProfilePictureInputLabel.nativeElement.innerText = event.target.files[0].name;

    this.imageChangedEvent = event;
    this.uploader.clearQueue();
    this.uploader.addToQueue([event.target.files[0]]);
    this.uploader.uploadAll();
    this.initFileUploader();

  }
}
