import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import {
  EnterpreneurAttendanceServiceProxy,
  CreateOrEditEnterpreneurAttendanceDto,
  EnterpreneurAttendanceInstructorsLookupTableDto,
  EnterpreneurAttendanceCourseLookupTableDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'createOrEditEnterpreneurAttendanceModal',
  templateUrl: './create-or-edit-enterpreneurAttendance-modal.component.html',
})
export class CreateOrEditEnterpreneurAttendanceModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;
  enterpreneurAttendance: any;

  // enterpreneurAttendance: CreateOrEditEnterpreneurAttendanceDto = new CreateOrEditEnterpreneurAttendanceDto();

  instructorsName = '';
  courseName = '';

  allInstructorss: EnterpreneurAttendanceInstructorsLookupTableDto[];
  allCourses: EnterpreneurAttendanceCourseLookupTableDto[];
  form: FormGroup;
  id: any;
  enterpreneur$: Observable<EnterpreneurAttendanceInstructorsLookupTableDto[]>;
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private _enterpreneurAttendanceServiceProxy: EnterpreneurAttendanceServiceProxy,
    private _dateTimeService: DateTimeService
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.createForm();
    this.getEnterpreneurDropdown();
  }
  createForm(item: any = {}) {
    this.form = this.fb.group({
        id: [item.id ? item.id : this.emptyguId],
        remark: [item.remark ? item.remark : ''],
        assignmentId: [{ value: item.assignmentId, disabled: this.id }, Validators.required],
        assignmentOptionId: [{ value: item.assignmentOptionId, disabled: this.id }, Validators.required],
        entrepreneurId: [{ value: item.entrepreneurId, disabled: this.id }, Validators.required],
    });
}
getEnterpreneurDropdown(){
  this.enterpreneur$ = this._enterpreneurAttendanceServiceProxy.getAllInstructorsForTableDropdown();
}
  show(enterpreneurAttendanceId?: string): void {
    if (!enterpreneurAttendanceId) {
      this.enterpreneurAttendance = new CreateOrEditEnterpreneurAttendanceDto();
      this.enterpreneurAttendance.id = enterpreneurAttendanceId;
      this.enterpreneurAttendance.date = this._dateTimeService.getStartOfDay();
      this.instructorsName = '';
      this.courseName = '';

      this.active = true;
      this.modal.show();
    } else {
      this._enterpreneurAttendanceServiceProxy
        .getEnterpreneurAttendanceForEdit(enterpreneurAttendanceId)
        .subscribe((result) => {
          this.enterpreneurAttendance = result;

          this.instructorsName = result.instructorsName;
          this.courseName = result.courseName;

          this.active = true;
          this.modal.show();
        });
    }
    this._enterpreneurAttendanceServiceProxy.getAllInstructorsForTableDropdown().subscribe((result) => {
      this.allInstructorss = result;
    });
    this._enterpreneurAttendanceServiceProxy.getAllCourseForTableDropdown().subscribe((result) => {
      this.allCourses = result;
    });
  }

  save(): void {
    this.saving = true;

    this._enterpreneurAttendanceServiceProxy
      .createOrEdit(this.enterpreneurAttendance)
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
