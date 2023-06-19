import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { takeUntil } from 'rxjs/operators';
import {
  CourseRecommendationsServiceProxy,
  CourseRecommendationAssignmentLookupTableDto,
  CourseRecommendationCourseLookupTableDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'createOrEditCourseRecommendationModal',
  templateUrl: './create-or-edit-courseRecommendation-modal.component.html',
})
export class CreateOrEditCourseRecommendationModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;
  active = false;
  saving = false;
  public destroy$ = new Subject<void>();
  assignment$: Observable<CourseRecommendationAssignmentLookupTableDto[]>;
  id: string;

  course$: Observable<CourseRecommendationCourseLookupTableDto[]>;
  assignmentId: string;
  constructor(
    private fb: FormBuilder,
    injector: Injector,
    private route: ActivatedRoute,
    private _courseRecommendationsServiceProxy: CourseRecommendationsServiceProxy,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.assignmentId = this.route.snapshot.params['assignmentId'];
    this.createForm();
    this.getAssignmentDropdown();
    this.getCoursesDropdown();
  }
  createForm(item: any = {}) {
    this.form = this.fb.group({
      id: [item.id ? item.id : this.emptyguId],
      remark: [item.remark ? item.remark : ''],
     assignmentId: [this.assignmentId],
     courseId: [item.courseId ? item.courseId : Validators.required],
    });
  }
getCoursesDropdown(){
  this.course$ = this._courseRecommendationsServiceProxy.getAllCourseForTableDropdown();
}
getAssignmentDropdown(){
  this.assignment$ = this._courseRecommendationsServiceProxy.getAllAssignmentForTableDropdown();
}
show(id) {
  this.active = true;
  this.modal.show();
}
showEdit(id: string): void {
  this.active = true;
  this.modal.show();
  this._courseRecommendationsServiceProxy
    .getCourseRecommendationForEdit(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((result) => {
      this.createForm(result);
    });
}
save() {
  this.saving = true;
  // this._courseRecommendationsServiceProxy.createOrEdit(this.form.getRawValue()).subscribe(() => {
  //   this.active = false;
  //   this.saving = false;
  //   this.form.reset();
  //   this.modal.hide();
  //   this.modalSave.emit(null);
  //   this.notify.success('Saved Successfully');
  // })
  if (this.form.valid) {
    this._courseRecommendationsServiceProxy
      .createOrEdit(this.form.getRawValue())
      .subscribe(() => {
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
  }
}
