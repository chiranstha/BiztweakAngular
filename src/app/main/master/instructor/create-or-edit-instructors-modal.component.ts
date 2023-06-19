import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize, takeUntil } from 'rxjs/operators';
import {
  InstructorServiceProxy,
  CreateOrEditInstructorsDto,
  InstructorsIndustryTableDto,
  UserTypeEnum,
  CommonDropDownDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { FileItem, FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { AppConsts } from '@shared/AppConsts';
import { IAjaxResponse, TokenService } from 'abp-ng2-module';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'createOrEditInstructorsModal',
  templateUrl: './create-or-edit-instructors-modal.component.html',
})
export class CreateOrEditInstructorsModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('uploadProfilePictureInputLabel') uploadProfilePictureInputLabel: ElementRef;
  @ViewChild('industry ') industryRefRef: NgSelectComponent;
  @ViewChild('nameRef', { read: ElementRef }) nameRef: ElementRef;
  @ViewChild('addressRef', { read: ElementRef }) addressRef: ElementRef;
  @ViewChild('userRef') userRef: NgSelectComponent;
  @ViewChild('jobRef', { read: ElementRef }) jobRef: ElementRef;
  @ViewChild('QualificationRef', { read: ElementRef }) QualificationRef: ElementRef;
  @ViewChild('emailRef', { read: ElementRef }) emailRef: ElementRef;
  @ViewChild('phoneRef', { read: ElementRef }) phoneRef: ElementRef;
  @ViewChild('shortDesRef', { read: ElementRef }) shortDesRef: ElementRef;
  active = false;
  saving = false;
  photoUrl: string;
  allIndustrys: InstructorsIndustryTableDto[];
  form: FormGroup;
  industry$: Observable<InstructorsIndustryTableDto[]>;
  incubator$: Observable<CommonDropDownDto[]>;
  id: any;
  public maxProfilPictureBytesUserFriendlyValue = 5;
  imageChangedEvent: any = '';
  public uploader: FileUploader;
  private _uploaderOptions: FileUploaderOptions = {};
  userTypeLabelMapping: Record<string, string> = {
    [UserTypeEnum.Coach]: 'Coach',
    [UserTypeEnum.Mentors]: 'Mentors',
    [UserTypeEnum.Consultant]: 'Consultant',
  };

  usertype = Object.values(UserTypeEnum).filter((value) => typeof value === 'number');

  public destroy$ = new Subject<void>();
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private _instructorServiceProxy: InstructorServiceProxy,
    private _dateTimeService: DateTimeService,
    private _tokenService: TokenService,
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.createForm();
    this.getInstructor();
    this.initFileUploader();
    this.getIncubatorDropdown();
  }
  createForm(item: any = {}) {
    this.form = this.fb.group({
      id: [item.id ? item.id : this.emptyguId],
      name: [item.name ? item.name : '', Validators.required],
      address: [item.address ? item.address : '', Validators.required],
      userType: [item.userType ? item.userType : '', Validators.required],
      jobExpreience: [item.jobExpreience ? item.jobExpreience : '', Validators.required],
      qualification: [item.qualification ? item.qualification : '', Validators.required],
      shortDescription: [item.shortDescription ? item.shortDescription : '', Validators.required],
      email: [item.email ? item.email : '', Validators.required],
      phone: [item.phone ? item.phone : '', Validators.required],
      industryId: [{ value: item.industryId, disabled: this.id }, Validators.required],
      photoUrl: [item.photoUrl ? item.photoUrl : '', Validators.required],
      photoToken: [item.photoToken, Validators.required],
      incubatorId: [{ value: item.incubatorId, disabled: this.id }, Validators.required],
    });
  }
  getInstructor() {
    this.industry$ = this._instructorServiceProxy.getAllIndustryForTableDropdown();
  }
  getIncubatorDropdown() {
    this.incubator$ = this._instructorServiceProxy.getAllIncubatorForTableDropdown();
  }
  show(instructorsId?: string): void {
    this.active = true;
    this.modal.show();
    if (instructorsId != null) {
      this._instructorServiceProxy
        .getInstructorsForEdit(instructorsId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((result) => {
          this.createForm(result);
        });
    }

  }
  showEdit(id: string): void {
    this.active = true;
    this.modal.show();
    this._instructorServiceProxy
      .getInstructorsForEdit(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.createForm(result);
      });
  }
  save(): void {
    this.saving = true;
    this._instructorServiceProxy
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
  shortCutOnEnter(position, e?: KeyboardEvent) {
    switch (position) {
      case 'userRef':
        this.industryRefRef.open();
        break;
      case 'industry':
        this.nameRef.nativeElement.focus();
        break;
      case 'nameRef':
        this.addressRef.nativeElement.focus();
        break;
      case 'addressRef':
        this.jobRef.nativeElement.focus();
        break;
      case 'jobRef':
        this.QualificationRef.nativeElement.focus();
        break;
      case 'QualificationRef':
        this.emailRef.nativeElement.focus();
        break;
      case 'emailRef':
        this.phoneRef.nativeElement.focus();
        break;
      case 'phoneRef':
        this.shortDesRef.nativeElement.focus();
        break;
      default:
        break;
    }
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

    let token = this.guid();
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
