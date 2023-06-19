import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import {
  GrowthPlansServiceProxy,
  CreateOrEditGrowthPlanDto,
  GrowthPlanEntrepreneurTableDto,
  GrowthPlanCourseSectionTableDto,
  GrowthPlanIndustryTableDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'createOrEditGrowthPlanModal',
  templateUrl: './create-or-edit-growthPlan-modal.component.html',
})
export class CreateOrEditGrowthPlanModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;


  form: FormGroup;
  id: any;
  entrepreneur$: Observable<GrowthPlanEntrepreneurTableDto[]>;
  Course$: Observable<GrowthPlanCourseSectionTableDto[]>;
  industry$: Observable<GrowthPlanIndustryTableDto[]>;
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private _growthPlansServiceProxy: GrowthPlansServiceProxy,
    private _dateTimeService: DateTimeService
  ) {
    super(injector);
  }
  growthDetail(): FormArray {
    return this.form.get('details') as FormArray;
}
  ngOnInit(): void {
    this.createForm();
    this.getCourseDropdown();
    this.getEntrepreneurDropdown();
    this.getIndustryDropdown();
  }
  createForm(item: any = {}) {
    this.form = this.fb.group({
        id: [item.id ? item.id : this.emptyguId],
        isChecked: [item.isChecked ? item.isChecked : false],
        completion: [item.completion ? item.completion : '', Validators.required],
        entrepreneurId: [{ value: item.entrepreneurId, disabled: this.id }, Validators.required],
        details: this.fb.array(
          (() => {
              if (!item.details) {
                  return [this.createDetailsForm()];
              }
              return item.details.map((item) => this.createDetailsForm(item));
          })()
      ),
    });
}
 createDetailsForm(item: any = {}){
  return this.fb.group({
    name: [item.name ? item.name : '', Validators.required],
    description: [item.description ? item.description : '', Validators.required],
    order: [item.order ? item.order : '', Validators.required],
  });
}
addGrowthOptions(){
  this.growthDetail().push(this.createDetailsForm());
}
getCourseDropdown(){
  this.Course$ = this._growthPlansServiceProxy.getAllCourseSectionForTableDropdown();
}
getEntrepreneurDropdown(){
  this.entrepreneur$ = this._growthPlansServiceProxy.getAllEntrepreneurForTableDropdown();
}
getIndustryDropdown(){
  this.industry$ = this._growthPlansServiceProxy.getAllIndustryForTableDropdown();
}
show(){
  this.active = true;
  this.modal.show();
}
  // show(growthPlanId?: string): void {
  //   if (!growthPlanId) {
  //     this.growthPlan = new CreateOrEditGrowthPlanDto();
  //     this.growthPlan.id = growthPlanId;
  //     this.entrepreneurName = '';
  //     this.courseSectionName = '';
  //     this.industryName = '';

  //     this.active = true;
  //     this.modal.show();
  //   } else {
  //     this._growthPlansServiceProxy.getGrowthPlanForEdit(growthPlanId).subscribe((result) => {
  //       this.growthPlan = result;

  //       this.entrepreneurName = result.entrepreneurName;
  //       this.courseSectionName = result.courseSectionName;
  //       this.industryName = result.industryName;

  //       this.active = true;
  //       this.modal.show();
  //     });
  //   }
  //   this._growthPlansServiceProxy.getAllEntrepreneurForTableDropdown().subscribe((result) => {
  //     this.allEntrepreneurs = result;
  //   });
  //   this._growthPlansServiceProxy.getAllCourseSectionForTableDropdown().subscribe((result) => {
  //     this.allCourseSections = result;
  //   });
  //   this._growthPlansServiceProxy.getAllIndustryForTableDropdown().subscribe((result) => {
  //     this.allIndustrys = result;
  //   });
  // }

  save(): void {
    this.saving = true;

    this._growthPlansServiceProxy
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
