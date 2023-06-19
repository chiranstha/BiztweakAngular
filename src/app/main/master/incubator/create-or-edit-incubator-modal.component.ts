import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize, takeUntil } from 'rxjs/operators';
import {
  IncubatorServiceProxy,
  CreateOrEditIncubatorDto,
  IncubatorIndustryLookupTableDto,
  InstructorServiceProxy,
  InstructorsIndustryTableDto,

} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { FileItem, FileUploader, FileUploaderOptions } from '@node_modules/ng2-file-upload';
import { IAjaxResponse, TokenService } from '@node_modules/abp-ng2-module';
import { AppConsts } from '@shared/AppConsts';

import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'createOrEditIncubatorModal',
  templateUrl: './create-or-edit-incubator-modal.component.html',
})
export class CreateOrEditIncubatorModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('uploadProfilePictureInputLabel') uploadProfilePictureInputLabel: ElementRef;
  active = false;
  saving = false;
  photoUrl: string;
  allIndustrys: InstructorsIndustryTableDto[];
  form: FormGroup;
  industry$: Observable<InstructorsIndustryTableDto[]>;
  id: any;
  public maxProfilPictureBytesUserFriendlyValue = 5;
  imageChangedEvent: any = '';
  public uploader: FileUploader;
  private _uploaderOptions: FileUploaderOptions = {};

  public destroy$ = new Subject<void>();
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _proxy: IncubatorServiceProxy,
    private _dateTimeService: DateTimeService,
    private _tokenService: TokenService,
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.createForm();
    this.getInstructor();
    this.initFileUploader();
  }
  createForm(item: any = {}) {
    this.form = this.fb.group({
      id: [item.id ? item.id : this.emptyguId],
      name: [item.name ? item.name : '', Validators.required],
      address: [item.address ? item.address : '', Validators.required],
      jobExperience: [item.jobExperience ? item.jobExperience : '', Validators.required],
      qualification: [item.qualification ? item.qualification : '', Validators.required],
      email: [item.email ? item.email : '', Validators.required],
      phone: [item.phone ? item.phone : '', Validators.required],
      industryId: [{ value: item.industryId, disabled: this.id }, Validators.required],
      photoUrl: [item.photoUrl ? item.photoUrl : '', Validators.required],
      photoToken: [item.photoToken, Validators.required],
    });
  }
  getInstructor() {
    this.industry$ = this._proxy.getAllIndustryForTableDropdown();
  }
  show(instructorsId?: string): void {
    this.active = true;
    this.modal.show();
    if (instructorsId != null) {
      this._proxy
        .getIncubatorForEdit(instructorsId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((result) => {
          this.createForm(result);
        });
    }
  
  }
  showEdit(id: string): void {
    this.active = true;
    this.modal.show();
    this._proxy
      .getIncubatorForEdit(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.createForm(result);
      });
  }
  save(): void {
    this.saving = true;
    this._proxy
      .createOrEdit(this.form.getRawValue())
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.active = false;
        this.saving = false;
        this.form.reset();
        this.modal.hide();
        this.modalSave.emit(null);
        this.notify.success('Saved Successfully');
      });
  }

  close(): void {
    this.active = false;
        this.saving = false;
        this.form.reset();
        this.modal.hide();
        this.modalSave.emit(null);
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
          this.form.get('photoToken').setValue(token);
        } else {
            this.message.error(resp.error.message);
        }
    };
  
    this.uploader.setOptions(this._uploaderOptions);
  }
  guid(): string {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
  
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
}
