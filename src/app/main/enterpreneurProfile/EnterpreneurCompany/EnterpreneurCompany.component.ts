import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
  CompanyBankTableDto,
  CompanyEntrepreneurTableDto,
  EntrepreneurProfileServiceProxy,
  GetBusinessPhaseLookupDto,
  GetCompanyForEditOutput,
  GetCompanyForViewDto,
} from '@shared/service-proxies/service-proxies';
import { DateTime } from 'luxon';
import { finalize, Observable } from 'rxjs';
import { FileItem, FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { AppConsts } from '@shared/AppConsts';
import { IAjaxResponse, TokenService } from 'abp-ng2-module';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { ActivatedRoute, Router } from '@angular/router';
import { forEach } from 'lodash-es';
// import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
// import { Address } from 'ngx-google-places-autocomplete/objects/address';
@Component({
  selector: 'app-EnterpreneurCompany',
  templateUrl: './EnterpreneurCompany.component.html',
  styleUrls: ['./EnterpreneurCompany.component.scss'],
})
export class EnterpreneurCompanyComponent extends AppComponentBase implements OnInit {
  @ViewChild('SampleDatePicker', { static: true }) sampleDatePicker: ElementRef;
  @ViewChild('SampleDateTimePicker', { static: true }) sampleDateTimePicker: ElementRef;
  @ViewChild('uploadProfilePictureInputLabel') uploadProfilePictureInputLabel: ElementRef;
  // @ViewChild('placesRef') placesRef: GooglePlaceDirective;
  sampleDate: DateTime;
  isCompanyRegistered = false;
  form: FormGroup;
  companyList: GetCompanyForViewDto[];
  public uploader: FileUploader;
  imageFileUploader: FileUploader;
  imageChangedEvent: any = '';
  public maxProfilPictureBytesUserFriendlyValue = 5;
  saving = false;
  id: any;
  EntCompany: any;
  logoUrl: string;
  logoFileToken: string;
  logoFileUploader: FileUploader;
  bank$: Observable<CompanyEntrepreneurTableDto[]>;
  business$: Observable<GetBusinessPhaseLookupDto[]>;
  industry$: Observable<CompanyBankTableDto[]>;
  selectedValue: any;
  isCompanyRegisteredControl: any;
  companyInfo: GetCompanyForEditOutput;
  options = {
    componentRestrictions: {
    // country: ['AU']
    }
};
  private _uploaderOptions: FileUploaderOptions = {};

  constructor(
    private injector: Injector,
    private _tokenService: TokenService,
    private _proxy: EntrepreneurProfileServiceProxy,
    private _enterprenureProfile: EntrepreneurProfileServiceProxy,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    super(injector);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.createForm();
    this.initFileUploader();
    this.getBankDropDown();
    this.getBusinessDropdown();
    this.getIndustryDropdown();
    this.getCompanyInfo();
    this.getAllCompany();
    const items = document.querySelectorAll('.accordion button');
    function toggleAccordion() {
      const itemToggle = this.getAttribute('aria-expanded');
      for (let i = 0; i < items.length; i++) {
        items[i].setAttribute('aria-expanded', 'false');
      }

      if (itemToggle === 'false') {
        this.setAttribute('aria-expanded', 'true');
      }
    }
    items.forEach((item) => item.addEventListener('click', toggleAccordion));
  }



  createForm(item: any = {}) {
    this.form = this.fb.group({
      id: [item.id ? item.id : this.id],
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
      // businessOperationDate: [item.businessOperationDate ? item.businessOperationDate : ''],
      // businessOperationDate: [item.businessOperationDate ? item.businessOperationDate : '', ],
      // cardTurnOver: [item.cardTurnOver ? item.cardTurnOver : '' , ],
      // cashTurnOver: [item.cashTurnOver ? item.cashTurnOver : '', ],
      // eftTurnOver: [item.eftTurnOver ? item.eftTurnOver : '', ],
      bankId: [item.bankId ? item.bankId : '', Validators.required],
      industryId: [item.industryId ? item.industryId : '', Validators.required],
      businessPhaseId: [item.businessPhaseId ? item.businessPhaseId : '', Validators.required],

      registrationNumber: [item.registrationNumber ? item.registrationNumber : '', Validators.required],
    });
  }

  // public handleAddressChange(address: Address) {
  //   // Do some stuff
  // }
  getCompanyInfo() {
    this._enterprenureProfile.getCompany(this.id).subscribe((result) => {
      this.companyInfo = result;
      this.createForm(this.companyInfo);
    });
  }

  getAllCompany() {
    this._proxy.getAllCompany().subscribe((result) => {
      this.companyList = result;
      forEach(this.companyList, (item) => {
        if (item.name === '') {
          if (!item.isAssignment) {
            this.router.navigate(['app/main/EnterpreneurAssessment', item.id]);
          } else {
            this.notify.error('Please Add  a company Information');
            this.router.navigate(['/app/main/EnterpreneurCompany', item.id]);
          }
        }
      });
    });
  }
  save(): void {
    this.saving = true;
    this._proxy
      .updateCompany(this.form.value)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.router.navigate(['app/main/ManageCompany', this.id]);
      });
  }
  getBankDropDown() {
    this.bank$ = this._proxy.getAllBankForTableDropdown();
  }
  getBusinessDropdown() {
    this.business$ = this._proxy.getAllBusinessPhaseForTableDropdown();
  }
  getIndustryDropdown() {
    this.industry$ = this._proxy.getAllIndustryForTableDropdown();
  }
  fileChangeEvent(event: any): void {
    if (event.target.files[0].size > 5242880) {
      //5MB
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
  // updateFormControlValue(event: any) {
  //   const checkboxValue = event.target.value;
  //   this.isCompanyRegisteredControl.setValue(checkboxValue);
  //   this.isCompanyRegistered = checkboxValue;
  // }
  updateFormControlValue(event) {
    const newValue = event.target.value;
    this.form.get('isCompanyRegistered').setValue(newValue);
  }
  updateOptionSelected(control: AbstractControl, value: boolean) {
    control.setValue(value);
  }
  NavigateToReportSummary(id: string) {
    this.router.navigate(['app/main/ReportSummary', id]);
  }
}
