import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import {
  DigitalResourceServiceProxy,
  CreateOrEditDigitalResourceDto,
  DigitalResourceDigitalCateogoryTableDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { FileUploader, FileUploaderOptions } from '@node_modules/ng2-file-upload';
import { IAjaxResponse, TokenService } from '@node_modules/abp-ng2-module';
import { AppConsts } from '@shared/AppConsts';

import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'createOrEditDigitalResourceModal',
  templateUrl: './create-or-edit-digitalResource-modal.component.html',
})
export class CreateOrEditDigitalResourceModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @ViewChild('DigitalResource_fileLabel') digitalResource_fileLabel: ElementRef;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;



  digitalCateogoryName = '';


  fileFileUploader: FileUploader;
  fileFileToken: string;
  fileFileName: string;
  fileFileAcceptedTypes = '';



  form: FormGroup;
  id: any;
  catagory$: Observable<DigitalResourceDigitalCateogoryTableDto[]>;
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private _digitalResourceServiceProxy: DigitalResourceServiceProxy,
    private _dateTimeService: DateTimeService,
    private _tokenService: TokenService,
    private _http: HttpClient
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.createForm();
    this.getCatagoryDropdown();
  }
  createForm(item: any = {}) {
    this.form = this.fb.group({
        id: [item.id ? item.id : this.emptyguId],
        name: [item.name ? item.name : ''],
        shortDescription: [item.shortDescription ? item.shortDescription : '', Validators.required],
        file: [item.file ? item.file : '', Validators.required],
        fileToken: [item.fileToken],
        digitalCateogoryId: [{ value: item.digitalCateogoryId, disabled: this.id }, Validators.required],
    });
}
getCatagoryDropdown(){
  this.catagory$ = this._digitalResourceServiceProxy.getAllDigitalCateogoryForTableDropdown();
}
show(id){
  this.active = true;
  this.modal.show();
}
  // show(digitalResourceId?: string): void {
  //   if (!digitalResourceId) {
  //     this.digitalResource = new CreateOrEditDigitalResourceDto();
  //     this.digitalResource.id = digitalResourceId;
  //     this.digitalCateogoryName = '';

  //     this.fileFileName = null;

  //     this.active = true;
  //     this.modal.show();
  //   } else {
  //     this._digitalResourceServiceProxy.getDigitalResourceForEdit(digitalResourceId).subscribe((result) => {
  //       this.digitalResource = result;

  //       this.digitalCateogoryName = result.digitalCateogoryName;

  //       this.fileFileName = result.fileFileName;

  //       this.active = true;
  //       this.modal.show();
  //     });
  //   }
  //   this._digitalResourceServiceProxy.getAllDigitalCateogoryForTableDropdown().subscribe((result) => {
  //     this.allDigitalCateogorys = result;
  //   });

  //   this.fileFileUploader = this.initializeUploader(
  //     AppConsts.remoteServiceBaseUrl + '/DigitalResource/UploadfileFile',
  //     (fileToken) => (this.fileFileToken = fileToken)
  //   );
  // }

  save(): void {
    this.saving = true;



    this._digitalResourceServiceProxy
      .createOrEdit(this.id)
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


  close(): void {
    this.active = false;
    this.modal.hide();
  }


}
