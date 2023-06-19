import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CourseCategoriesServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'createOrEditCourseCategoryModal',
  templateUrl: './create-or-edit-courseCategory-modal.component.html'
})
export class CreateOrEditCourseCategoryModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @ViewChild('uploadProfilePictureInputLabel') uploadProfilePictureInputLabel: ElementRef;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('nameRef', { read: ElementRef }) nameRef: ElementRef;
  @ViewChild('descriptionRef', { read: ElementRef }) descriptionRef: ElementRef;
  id: any;
  form: FormGroup;
  active = false;
  saving = false;
  imageChangedEvent: any = '';
  public maxProfilPictureBytesUserFriendlyValue = 5;
  public uploader: FileUploader;
  public useGravatarProfilePicture = false;
  public destroy$ = new Subject<void>();
  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    injector: Injector,
    private _courseCategoriesServiceProxy: CourseCategoriesServiceProxy,
    private fb: FormBuilder
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.createForm();
  }
  show(id?: string): void {
    this.active = true;
    this.modal.show();
  }
  
  showEdit(id: string): void {
    this.active = true;
    this.modal.show();
    this._courseCategoriesServiceProxy
      .getCourseCategoryForEdit(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.createForm(result);
      });
  }
  save() {
    this.saving = true;
    if (this.form.valid) {
      this._courseCategoriesServiceProxy.createOrEdit(this.form.getRawValue()).subscribe(() => {
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
    this.saving = false;
    this.form.reset();
    this.modalSave.emit(null);
  }
  createForm(item: any = {}) {
    this.form = this.fb.group({
      id: [item.id ? item.id : this.emptyguId],
      name: [item.name ? item.name : '', Validators.required],
      description: [item.description ? item.description : '']
    });
  }
  clearForm(id) { }
  fileChangeEvent(event: any): void {
    if (event.target.files[0].size > 5242880) {
      //5MB
      this.message.warn(this.l('ProfilePicture_Warn_SizeLimit', this.maxProfilPictureBytesUserFriendlyValue));
      return;
    }

    this.uploadProfilePictureInputLabel.nativeElement.innerText = event.target.files[0].name;

    this.imageChangedEvent = event;
  }
  imageCroppedFile(event: ImageCroppedEvent) {
    this.uploader.clearQueue();
    this.uploader.addToQueue([<File>base64ToFile(event.base64)]);
  }
  shortCutOnEnter(position) {
    switch (position) {
        case 'nameRef':
            this.descriptionRef.nativeElement.focus();
            break;
        default:
            break;
    }
}
}
