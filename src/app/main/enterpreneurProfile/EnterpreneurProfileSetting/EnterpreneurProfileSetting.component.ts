import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { EntrepreneurProfileServiceProxy, GetCompanyForViewDto } from '@shared/service-proxies/service-proxies';
import { IAjaxResponse, TokenService } from 'abp-ng2-module';
import { FileItem, FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-EnterpreneurProfileSetting',
  templateUrl: './EnterpreneurProfileSetting.component.html',
  styleUrls: ['./EnterpreneurProfileSetting.component.css']
})
export class EnterpreneurProfileSettingComponent extends AppComponentBase implements OnInit{
  @ViewChild('uploadProfilePictureInputLabel') uploadProfilePictureInputLabel: ElementRef;
  form: FormGroup;
  logoUrl: string;
  CompanyData: GetCompanyForViewDto[];
  id: any;
  imageChangedEvent: any = '';
  public uploader: FileUploader;
  public maxProfilPictureBytesUserFriendlyValue = 5;
  private _uploaderOptions: FileUploaderOptions = {};

  constructor(private injector: Injector,  private fb: FormBuilder,  
    private _tokenService: TokenService, private _proxy: EntrepreneurProfileServiceProxy) { super(injector) }

  ngOnInit() {
    this.createForm();
    this.getCompanyData();
    this.initFileUploader();
   
  }
  createForm(item: any = {}) {
    this.form = this.fb.group({
      id: [item.id ? item.id : this.emptyguId],
      displayname: [item.displayname ? item.displayname : '', Validators.required],
      email: [item.email ? item.email : '', Validators.required],
      education: [item.education ? item.education : '', Validators.required],
      location: [item.location ? item.location : '', Validators.required],
      skills: [item.skills ? item.skills : '', Validators.required],
      oldpw: [item.oldpw ? item.oldpw : '', Validators.required],
      newpw: [item.newpw ? item.newpw : '', Validators.required],
      cnewpw: [item.cnewpw ? item.cnewpw : '', Validators.required],
      // update: [item.serviceDescription ? item.serviceDescription : '', Validators.required],
      // newsletter: [item.newsletter ? item.newsletter : '', Validators.required],
      logoUrl: [item.logoUrl ? item.logoUrl : '', Validators.required],
      logoToken: [item.logoToken, Validators.required],
  })
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
        this.form.get('logoToken').setValue(token);
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
  save(){}


getCompanyData(){
  this._proxy.getAllCompany().subscribe(res => {
    this.CompanyData = res;
    console.log('COmpany Data', this.CompanyData);
  });
}


}
