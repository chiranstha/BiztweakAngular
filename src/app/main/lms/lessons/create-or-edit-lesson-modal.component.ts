import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import {
  LessonsServiceProxy,
  CreateOrEditLessonDto,
  LessonCourseSectionTableDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { IAjaxResponse, TokenService } from '@node_modules/abp-ng2-module';
import { AppConsts } from '@shared/AppConsts';
import { FileItem, FileUploader, FileUploaderOptions } from '@node_modules/ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';

@Component({
  selector: 'createOrEditLessonModal',
  templateUrl: './create-or-edit-lesson-modal.component.html',
})
export class CreateOrEditLessonModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @ViewChild('uploadProfilePictureInputLabel') uploadProfilePictureInputLabel: ElementRef;

  @ViewChild('Lesson_attachmentLabel') lesson_attachmentLabel: ElementRef;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;
  form: FormGroup;
  id: any;
  section$: Observable<LessonCourseSectionTableDto[]>;
  attachmentUrl: string;
  public maxProfilPictureBytesUserFriendlyValue = 5;
  imageChangedEvent: any = '';
  public uploader: FileUploader;
  private _uploaderOptions: FileUploaderOptions = {};
  constructor(
    injector: Injector,
    private _lessonsServiceProxy: LessonsServiceProxy,
    private _dateTimeService: DateTimeService,
    private _tokenService: TokenService,
    private _http: HttpClient,
    private fb: FormBuilder
  ) {
    super(injector);
  }
  ngOnInit(): void {
this.createForm();
this.getCourseSection();
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
        // attachment: [item.attachment ? item.isFreeLesson : ''],
        attachmentUrl: [item.attachmentUrl ? item.attachmentUrl : ''],
        attachmentToken: [item.attachmentToken ? item.attachmentToken : ''],
        caption: [item.caption ? item.caption : '', Validators.required],
        cloudVideoId: [item.cloudVideoId ? item.cloudVideoId : Validators.required],
        courseSectionId: [item.courseSectionId ? item.courseSectionId : '', Validators.required],
    });
}
show(lessonId?: string): void{
  this.active = true;
      this.modal.show();
}

save(){
  this.saving = true;
  if (this.form.valid) {
    this._lessonsServiceProxy.createOrEdit(this.form.getRawValue()).subscribe(() => {
      this.active = false;
      this.saving = false;
      this.form.reset();
      this.modal.hide();
      this.modalSave.emit(null);
      this.notify.success('Saved Successfully');
    });
  } else {
    this.saving = false;
    this.notify.error('Form is invalid!!');
  }
}

  close(): void {
    this.active = false;
    this.modal.hide();
  }
getCourseSection(){
  this.section$ = this._lessonsServiceProxy.getAllCourseSectionForTableDropdown() as Observable<LessonCourseSectionTableDto[]>;

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
guid(): string {
  function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
imageCroppedFile(event: ImageCroppedEvent) {
  this.uploader.clearQueue();
  this.uploader.addToQueue([<File>base64ToFile(event.base64)]);
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
        this.form.get('attachmentToken').setValue(token);
      } else {
          this.message.error(resp.error.message);
      }
  };

  this.uploader.setOptions(this._uploaderOptions);
}
}
