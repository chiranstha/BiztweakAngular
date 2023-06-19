import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize, takeUntil } from 'rxjs/operators';
import {
  CourseSectionsServiceProxy,
  CourseSectionCourseTableDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'createOrEditCourseSectionModal',
  templateUrl: './create-or-edit-courseSection-modal.component.html',
})
export class CreateOrEditCourseSectionModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;
  form: FormGroup;
  public destroy$ = new Subject<void>();
  courses$: Observable<CourseSectionCourseTableDto[]>;
  id: any;
  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _courseSectionsServiceProxy: CourseSectionsServiceProxy,
    private _dateTimeService: DateTimeService,
    private _route: ActivatedRoute,
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.createForm();
    this.getCourses();
  }

  createForm(item: any = {}) {
    this.form = this.fb.group({
      id: [item.id ? item.id : this.emptyguId],
      name: [item.name ? item.name : '', Validators.required],
      order: [item.order ? item.order : '', Validators.required],
      courseId: [item.courseId ? item.courseId : '', Validators.required],
    });
  }

  show() {
    this.active = true;
    this.modal.show();
  }
  save() {
    this.saving = true;
    if (this.form.valid) {
      this._courseSectionsServiceProxy
        .createOrEditSection(this.form.getRawValue())
        .subscribe(() => {
          this.active = false;
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

  getCourses() {
    this.courses$ = this._courseSectionsServiceProxy.getAllCourseForTableDropdown();
  }
  onClassChange(event) {
    console.log(event.target.value);
    // or
    // this.selectedClass = event.target.value;
  }

}
