import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize, takeUntil } from 'rxjs/operators';
import {
  AssignmentsServiceProxy,
  AssignmentCategoryTableDto,
  GetBusinessPhaseLookupDto,
  CommonDropDownDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'createOrEditAssignmentModal',
  templateUrl: './create-or-edit-assignment-modal.component.html',
})
export class CreateOrEditAssignmentModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  public destroy$ = new Subject<void>();
  active = false;
  saving = false;
  id: string;
  assignmentId: string;
  form: FormGroup;
  businesss$: Observable<GetBusinessPhaseLookupDto[]>;
  course$: Observable<AssignmentCategoryTableDto[]>;
  catagory: AssignmentCategoryTableDto[];
  priority$: Observable<CommonDropDownDto[]>;
  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _assignmentsServiceProxy: AssignmentsServiceProxy,
  ) {
    super(injector);
  }
  assignmentOptions(): FormArray {
    return this.form.get('assignmentOptions') as FormArray;
  }
  recommendationdetails(empIndex: number): FormArray {
    return this.assignmentOptions().at(empIndex).get('recommendations') as FormArray;
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.createForm();
    this.getBusinessPhase();
    this.getpriorityDropdown();
  }
  createForm(item: any = {}) {
    this.form = this.fb.group({
      id: [item.id ? item.id : this.emptyguId],
      name: [item.name ? item.name : '', Validators.required],
      yesAnsDescription: [item.yesAnsDescription ? item.yesAnsDescription : '', Validators.required],
      noAnsDescription: [item.noAnsDescription ? item.noAnsDescription : '', Validators.required],
      shortDescription: [item.shortDescription ? item.shortDescription : '', Validators.required],
      order: [item.order ? item.order : '', Validators.required],
      assignmentCategoryId: [{value: item.assignmentCategoryId ? item.assignmentCategoryId : null, disabled: item.id}, Validators.required],
      businessPhaseId: [{value: item.businessPhaseId ? item.businessPhaseId : null, disabled: item.id} , Validators.required],
      prorityId: [{value: item.prorityId ? item.prorityId : null, disabled: item.id} , Validators.required],
      //   assignmentOptions: this.fb.array(
      //     (() => {
      //         if (!item.assignmentOptions) {
      //             return [this.createAssignmentOpinionForm()];
      //         }
      //         return item.assignmentOptions.map((item) => this.createAssignmentOpinionForm(item));
      //     })()
      // ),
    });
  }
  createAssignmentOpinionForm(item: any = {}) {
    return this.fb.group({
      id: [item.id ? item.id : this.emptyguId],
      name: [item.name ? item.name : '', Validators.required],
      recommendations: this.fb.array(
        (() => {
          if (!item.recommendations) {
            return [this.createRecommendationForm()];
          }
          return item.recommendations.map((item) => this.createRecommendationForm(item));
        })()
      ),
    });
  }
  createRecommendationForm(item: any = {}): FormGroup {
    return this.fb.group({
      courseId: [item.courseId ? item.courseId : Validators.required],

      id: [item.id ? item.id : this.emptyguId],
    });
  }
  addassignmentOptions() {
    console.log('Adding');
    this.assignmentOptions().push(this.createAssignmentOpinionForm());
  }
  addRecommendationForm(empIndex: number) {
    this.recommendationdetails(empIndex).push(this.createRecommendationForm());
  }
getpriorityDropdown(){
  this.priority$ = this._assignmentsServiceProxy.getAllPriorityForTableDropdown();
}

  getBusinessPhase() {
    this.businesss$ = this._assignmentsServiceProxy.getAllBusinessPhaseForTableDropdown();
  }
  assignmentCategory(id: string) {
    this._assignmentsServiceProxy.getAllAssignmentCategoryForTableDropdown(id).subscribe((result) => {
      this.catagory = result;
    });
  }

  show(assignmentId?: string): void {
    this.active = true;
    this.modal.show();
  }
  showEdit(id: string) {
    this.active = true;
    this.modal.show();
    this._assignmentsServiceProxy
      .getAssignmentForEdit(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.assignmentCategory(result.businessPhaseId);
        setTimeout(() => {
          this.createForm(result);
          this.modalSave.emit(null);
        }, 200);
      });
  }
  save(): void {
    this.saving = true;

    this._assignmentsServiceProxy
      .createOrEdit(this.form.getRawValue())
      .pipe(
        finalize(() => {
          this.saving = false;
          this.form.reset();
          this.modalSave.emit(null);
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.close(); this.active = false;
        this.saving = false;
        this.form.get('assignmentOptions').get('recommendations').reset();
        this.form.get('assignmentOptions').reset();
        
        this.form.reset();

        let frmArray = this.form.get('assignmentOptions') as FormArray;
        frmArray.clear();

        const control = <FormArray>this.form.controls['assignmentOptions'];
        for (let i = control.length - 1; i >= 0; i--) {
          control.removeAt(i);
        }
        this.modal.hide();
        this.modalSave.emit(null);
      });
  }

  close(): void {
    this.active = false;
    this.saving = false;
    this.form.reset();
    this.modal.hide();
    this.modalSave.emit(null);
  }


}
