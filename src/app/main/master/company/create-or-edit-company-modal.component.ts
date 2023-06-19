import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize, takeUntil } from 'rxjs/operators';
import {
  CompanyServiceProxy,
  CompanyEntrepreneurTableDto,
  CompanyBankTableDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

import { FileItem, FileUploader, FileUploaderOptions } from '@node_modules/ng2-file-upload';
import { AppConsts } from '@shared/AppConsts';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { DateTime } from 'luxon';
import { ActivatedRoute } from '@angular/router';
import { IAjaxResponse, TokenService } from 'abp-ng2-module';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'createOrEditCompanyModal',
  templateUrl: './create-or-edit-company-modal.component.html',
})
export class CreateOrEditCompanyModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('Company_logoLabel') company_logoLabel: ElementRef;
  @ViewChild('uploadProfilePictureInputLabel') uploadProfilePictureInputLabel: ElementRef;
  @ViewChild('SampleDatePicker', { static: true }) sampleDatePicker: ElementRef;
  @ViewChild('SampleDateTimePicker', { static: true }) sampleDateTimePicker: ElementRef;
  entrepreneur$: Observable<CompanyEntrepreneurTableDto[]>;
  bank$: Observable<CompanyBankTableDto[]>;
  public uploader: FileUploader;
  sampleDate: DateTime;
  imageChangedEvent: any = '';
  public maxProfilPictureBytesUserFriendlyValue = 5;
  active = false;
  saving = false;
  logoUrl: string;
  logoFileUploader: FileUploader;
  logoFileToken: string;
  logoFileName: string;
  logoFileAcceptedTypes = '';
  public destroy$ = new Subject<void>();
  form: FormGroup;
  id: any;
  private _uploaderOptions: FileUploaderOptions = {};
  constructor(
    private route: ActivatedRoute,
    injector: Injector,
    private fb: FormBuilder,
    private _companyServiceProxy: CompanyServiceProxy,
    private _tokenService: TokenService, ) {
    super(injector);
  }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.createForm();
    this.getEntrepreneurDropdown();
    this.getBankDropdown();
    this.initFileUploader();
  }
  createForm(item: any = {}) {
    this.form = this.fb.group({
        id: [item.id ? item.id : this.emptyguId],
        name: [item.name ? item.name : '', Validators.required],
        description: [item.description ? item.description : '', Validators.required],
        logoUrl: [item.logoUrl ? item.logoUrl : '', Validators.required],
        logoToken: [item.logoToken ? item.logoToken : '', Validators.required],
        isCompanyRegistered: [item.isCompanyRegistered ? item.isCompanyRegistered : false],
        location: [item.location ? item.location : '', Validators.required],
        noOfEmployee: [item.noOfEmployee ? item.noOfEmployee : '', Validators.required],
        annualTurnOver: [item.annualTurnOver ? item.annualTurnOver : '', Validators.required],
        monthlyTurnOver: [item.monthlyTurnOver ? item.monthlyTurnOver : '', Validators.required],
        serviceDescription: [item.serviceDescription ? item.serviceDescription : '', Validators.required],
        businessOperationDate: [item.businessOperationDate ? item.businessOperationDate : '', Validators.required],
        cardTurnOver: [item.cardTurnOver ? item.cardTurnOver : '', Validators.required],
        cashTurnOver: [item.cashTurnOver ? item.cashTurnOver : '', Validators.required],
        eftTurnOver: [item.eftTurnOver ? item.eftTurnOver : '', Validators.required],
        entrepreneurId: [{ value: item.entrepreneurId, disabled: this.id }, Validators.required],
        bankId: [{ value: item.bankId, disabled: this.id }, Validators.required],
    });
}
getEntrepreneurDropdown(){
  this.entrepreneur$ = this._companyServiceProxy.getAllEntrepreneurForTableDropdown();
}
getBankDropdown(){
  this.bank$ = this._companyServiceProxy.getAllBankForTableDropdown();
}
save(): void {
  this.saving = true;

  this._companyServiceProxy
    .createOrEdit(this.form.getRawValue())
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

show(id){
  this.active = true;
  this.modal.show();
  }
  showEdit(id: string): void {
    this.active = true;
    this.modal.show();
    this._companyServiceProxy
      .getCompanyForEdit(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.createForm(result);
      });
  }

  getDownloadUrl(id: string): string {
    return AppConsts.remoteServiceBaseUrl + '/File/DownloadBinaryFile?id=' + id;
  }

  close(): void {
    this.active = false;
    this.form.reset();
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
        this.form.get('logoToken').setValue(token);
      } else {
        this.message.error(resp.error.message);
      }
    };

    this.uploader.setOptions(this._uploaderOptions);
  }
  imageCroppedFile(event: ImageCroppedEvent) {
    this.uploader.clearQueue();
    this.uploader.addToQueue([<File>base64ToFile(event.base64)]);
  }
}
