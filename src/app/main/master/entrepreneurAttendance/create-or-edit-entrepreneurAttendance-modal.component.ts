import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import {
  EntrepreneurAttendanceServiceProxy,
  CreateOrEditEntrepreneurAttendanceDto,
  EntrepreneurAttendanceInstructorsTableDto,
  EntrepreneurAttendanceCourseTableDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'createOrEditEntrepreneurAttendanceModal',
  templateUrl: './create-or-edit-entrepreneurAttendance-modal.component.html',
})
export class CreateOrEditEntrepreneurAttendanceModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;
  entrepreneurAttendance: any;

  // entrepreneurAttendance: CreateOrEditEntrepreneurAttendanceDto = new CreateOrEditEntrepreneurAttendanceDto();

  instructorsName = '';
  courseName = '';


  form: FormGroup;
  id: any;
  sampleDate: DateTime;
course$: Observable<EntrepreneurAttendanceInstructorsTableDto[]>;
instructor$: Observable<EntrepreneurAttendanceInstructorsTableDto[]>;
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private _entrepreneurAttendanceServiceProxy: EntrepreneurAttendanceServiceProxy,
    private _dateTimeService: DateTimeService
  ) {
    super(injector);
  }
  Detail(): FormArray {
    return this.form.get('details') as FormArray;
}
  ngOnInit(): void {
    this.createForm();
    this.getCourseDropdown();
    this.getInstructorsDropdown();
  }
  createForm(item: any = {}) {
    this.form = this.fb.group({
        id: [item.id ? item.id : this.emptyguId],
        date: [item.date ? item.date : '', Validators.required],
        narration: [item.narration ? item.narration : '', Validators.required],
        instructorsId: [{ value: item.instructorsId, disabled: this.id }, Validators.required],
        courseId: [{ value: item.courseId, disabled: this.id }, Validators.required],
        details: this.fb.array(
          (() => {
              if (!item.details) {
                  return [this.createDetailsForm()];
              }
              return item.quizDetail.map((item) => this.createDetailsForm(item));
          })()
      ),
    });
}
 createDetailsForm(item: any = {}){
  return this.fb.group({
    id: [item.id ? item.id : this.emptyguId],
    status: [item.status ? item.status : false],
    remark: [item.remark ? item.remark : '', Validators.required],
    entrepreneurId: [{ value: item.entrepreneurId, disabled: this.id }, Validators.required],
  });
}
addDetails() {
  console.log('Adding');
  this.Detail().push(this.createDetailsForm());
}
getCourseDropdown(){
  this.course$ = this._entrepreneurAttendanceServiceProxy.getAllCourseForTableDropdown();
}
getInstructorsDropdown(){
  this.instructor$ = this._entrepreneurAttendanceServiceProxy.getAllInstructorsForTableDropdown();
}
show(entrepreneurAttendanceId?: string): void {
  this.active = true;
  this.modal.show();
}
  // show(entrepreneurAttendanceId?: string): void {
  //   if (!entrepreneurAttendanceId) {
  //     this.entrepreneurAttendance = new CreateOrEditEntrepreneurAttendanceDto();
  //     this.entrepreneurAttendance.id = entrepreneurAttendanceId;
  //     this.entrepreneurAttendance.date = this._dateTimeService.getStartOfDay();
  //     this.instructorsName = '';
  //     this.courseName = '';

  //     this.active = true;
  //     this.modal.show();
  //   } else {
  //     this._entrepreneurAttendanceServiceProxy
  //       .getEntrepreneurAttendanceForEdit(entrepreneurAttendanceId)
  //       .subscribe((result) => {
  //         this.entrepreneurAttendance = result;

  //         this.instructorsName = result.instructorsName;
  //         this.courseName = result.courseName;

  //         this.active = true;
  //         this.modal.show();
  //       });
  //   }
  //   this._entrepreneurAttendanceServiceProxy.getAllInstructorsForTableDropdown().subscribe((result) => {
  //     this.allInstructorss = result;
  //   });
  //   this._entrepreneurAttendanceServiceProxy.getAllCourseForTableDropdown().subscribe((result) => {
  //     this.allCourses = result;
  //   });
  // }

  save(): void {
    this.saving = true;

    this._entrepreneurAttendanceServiceProxy
      .createOrEdit(this.entrepreneurAttendance)
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
