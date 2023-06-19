import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize, takeUntil } from 'rxjs/operators';
import {
  DigitalCateogoriesServiceProxy,
  CreateOrEditDigitalCateogoryDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { FileUploader,FileItem, FileUploaderOptions } from '@node_modules/ng2-file-upload';
import { IAjaxResponse, TokenService } from '@node_modules/abp-ng2-module';
import { AppConsts } from '@shared/AppConsts';

import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'createOrEditDigitalCateogoryModal',
  templateUrl: './create-or-edit-digitalCateogory-modal.component.html',
})
export class CreateOrEditDigitalCateogoryModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @ViewChild('DigitalCateogory_imageLabel') digitalCateogory_imageLabel: ElementRef;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('uploadProfilePictureInputLabel') uploadProfilePictureInputLabel: ElementRef;
  active = false;
  saving = false;
  public uploader: FileUploader;
  imageChangedEvent: any = '';
  imageFileUploader: FileUploader;
  imageFileToken: string;
  imageFileName: string;
  imageUrl: string;
  imageFileAcceptedTypes = '';
  public destroy$ = new Subject<void>();
  form: FormGroup;
  id: any;
  private _uploaderOptions: FileUploaderOptions = {};
  public maxProfilPictureBytesUserFriendlyValue = 5;
  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _digitalCateogoriesServiceProxy: DigitalCateogoriesServiceProxy,
    private _dateTimeService: DateTimeService,
    private _tokenService: TokenService,
    private _http: HttpClient
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.createForm();
    this.initFileUploader();
  }
  createForm(item: any = {}) {
    this.form = this.fb.group({
        id: [item.id ? item.id : this.emptyguId],
        name: [item.name ? item.name : '', Validators.required],
        shortDescription: [item.shortDescription ? item.shortDescription : '', Validators.required],
        imageUrl: [item.imageUrl ? item.imageUrl : '', Validators.required],
        imageToken: [item.imageToken, Validators.required],
    });
}
imageCroppedFile(event: ImageCroppedEvent) {
  this.uploader.clearQueue();
  this.uploader.addToQueue([<File>base64ToFile(event.base64)]);
}
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
        this.form.get('imageToken').setValue(token);
      } else {
          this.message.error(resp.error.message);
      }
  };

  this.uploader.setOptions(this._uploaderOptions);
}
show(id){
  if(!id){
    this.active = true;
    this.modal.show();
  }else {
    this.active = true;
    this.modal.show();
    this._digitalCateogoriesServiceProxy
    .getDigitalCateogoryForEdit(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((result) => {
      this.createForm(result);
    });
  }
  
}
 

  save(): void {
    this.saving = true;
    this._digitalCateogoriesServiceProxy
      .createOrEdit(this.form.value)
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


  getDownloadUrl(id: string): string {
    return AppConsts.remoteServiceBaseUrl + '/File/DownloadBinaryFile?id=' + id;
  }

  close(): void {
    this.active = false;
    this.modal.hide();
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
