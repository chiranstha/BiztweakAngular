import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { takeUntil } from 'rxjs/operators';
import { AssignmentTypesServiceProxy, CommonDropDownDto, GetBusinessPhaseLookupDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'createOrEditAssignmentTypeModal',
  templateUrl: './create-or-edit-assignmentType-modal.component.html',
})
export class CreateOrEditAssignmentTypeModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;
  form: FormGroup;
  public destroy$ = new Subject<void>();
  business$: Observable<CommonDropDownDto[]>;
  assignmentType$: Observable<GetBusinessPhaseLookupDto[]>;
  id: any;
  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _proxy: AssignmentTypesServiceProxy,
    private _dateTimeService: DateTimeService
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.createForm();
  }
  createForm(item: any = {}) {
    this.form = this.fb.group({
      id: [item.id ? item.id : this.emptyguId],
      name: [item.name ? item.name : '', Validators.required],
      description: [item.description ? item.description : ''],
    });
  }
  show() {
    this.active = true;
    this.modal.show();
  }

  showEdit(id: string): void {
    this.active = true;
    this.modal.show();
    this._proxy.getAssignmentTypeForEdit(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.createForm(result);
      });
  }
  save() {
    this.saving = true;
    if (this.form.valid) {
      this._proxy
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
    this.saving = false;
    this.form.reset();
    this.modal.hide();
    this.modalSave.emit(null);
  }
}
