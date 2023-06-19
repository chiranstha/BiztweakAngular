import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CourseSectionCourseTableDto, CourseSectionsServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'createOrEditSectionModal',
  templateUrl: './create-or-edit-section-modal.component.html'
})
export class CreateOrEditSectionModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  courseId: string;

  active = false;
  form: FormGroup;
  saving = false;
  id: any;
  course$: Observable<CourseSectionCourseTableDto[]>;
  public destroy$ = new Subject<void>();
  constructor(
    private route: ActivatedRoute,
    private injector: Injector,
    private fb: FormBuilder,
    private _courseSectionsServiceProxy: CourseSectionsServiceProxy
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.createForm();
    this.getCourseDropdown();
  }
  createForm(item: any = {}) {
    this.form = this.fb.group({
      id: [item.id ? item.id : this.emptyguId],
      name: [item.name ? item.name : '', Validators.required],
      order: [item.order ? item.order : '', Validators.required],
      courseId: [this.courseId, Validators.required]
    });
  }
  getCourseDropdown() {
    this.course$ = this._courseSectionsServiceProxy.getAllCourseForTableDropdown();
  }
  save() {
    this.saving = true;
    if (this.form.valid) {
      this._courseSectionsServiceProxy.createOrEditSection(this.form.getRawValue()).subscribe(() => {
        this.active = false;
        this.modal.hide();
        this.saving = false;
        this.form.reset();
        this.modalSave.emit(null);
        this.notify.success('Saved Successfully');
      });
    } else {
      this.saving = false;
      this.notify.error('Form is invalid!!');
    }
  }
  show(courseId) {
    this.active = true;
    this.modal.show();
    this.courseId = courseId;
    this.createForm();
  }
  // showEdit(id: string): void {
  //   this.active = true;
  //   this.modal.show();
  //   this._courseSectionsServiceProxy
  //     .getCourseSectionForEdit(id)
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((result) => {
  //       this.createForm(result);
  //     });
  // }
  close(): void {
    this.active = false;
    this.modal.hide();
  }
}
