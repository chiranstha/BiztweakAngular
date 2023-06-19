import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize, takeUntil } from 'rxjs/operators';
import {
  EntrepreneursServiceProxy,
  CreateOrEditEntrepreneurDto,
  EntrepreneurIndustryTableDto,
  EntrepreneurBankTableDto,
  EntrepreneurInstructorsTableDto,
  CoursePhaseLevel,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'createOrEditEntrepreneurModal',
  templateUrl: './create-or-edit-entrepreneur-modal.component.html',
})
export class CreateOrEditEntrepreneurModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  public destroy$ = new Subject<void>();
  active = false;
  saving = false;

  allIndustrys: EntrepreneurIndustryTableDto[];
  allBanks: EntrepreneurBankTableDto[];
  allInstructorss: EntrepreneurInstructorsTableDto[];
  form: FormGroup;
  id: any;
  industry$: Observable<EntrepreneurIndustryTableDto[]>;
  bank$: Observable<EntrepreneurBankTableDto[]>;
  instructor$: Observable<EntrepreneurInstructorsTableDto[]>;

  phaseLabelMapping: Record<CoursePhaseLevel, string> = {
    [CoursePhaseLevel.Ideation]: 'Ideation',
    [CoursePhaseLevel.StartUp]: 'StartUp',
    [CoursePhaseLevel.EarlyStage]: 'Early Stage'
  };

  phase = Object.values(CoursePhaseLevel).filter((value) => typeof value === 'number');

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _entrepreneursServiceProxy: EntrepreneursServiceProxy,
    private _dateTimeService: DateTimeService
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.createForm();
    this.getIndustryDropdown();
    this.getBankDropdown();
    this.getInstructorDropdown();
  }
  createForm(item: any = {}) {
    this.form = this.fb.group({
        id: [item.id ? item.id : this.emptyguId],
        location: [item.location ? item.location : '', Validators.required],
        phase: [item.phase ? item.phase : '', Validators.required],
        jobExperience: [item.jobExperience ? item.jobExperience : '', Validators.required],
        qualification: [item.qualification ? item.qualification : '', Validators.required],
        shortDescription: [item.shortDescription ? item.shortDescription : '', Validators.required],
        email: [item.email ? item.email : '', Validators.required],
        phone: [item.phone ? item.phone : '', Validators.required],
        name: [item.name ? item.name : '', Validators.required],
        // industryId: [item.industryId ? item.industryId : '', Validators.required],
        industryId: [{ value: item.industryId, disabled: this.id }, Validators.required],
        bankId: [{ value: item.bankId, disabled: this.id }, Validators.required],
        instructorsId: [{ value: item.instructorsId, disabled: this.id }, Validators.required],
    });
}
getIndustryDropdown(){
  this.industry$ = this._entrepreneursServiceProxy.getAllIndustryForTableDropdown();
}
getBankDropdown(){
  this.bank$  = this._entrepreneursServiceProxy.getAllBankForTableDropdown();
}
getInstructorDropdown(){
  this.instructor$ = this._entrepreneursServiceProxy.getAllInstructorsForTableDropdown();
}
show(id) {
  this.active = true;
  this.modal.show();
} 

  save(): void {
    this.saving = true;

    this._entrepreneursServiceProxy
      .createOrEdit(this.form.getRawValue())
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
  showEdit(id: string): void {
    this.active = true;
    this.modal.show();
    this._entrepreneursServiceProxy
      .getEntrepreneurForEdit(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.createForm(result);
      });
  }

}
