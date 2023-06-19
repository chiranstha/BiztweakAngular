import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { takeUntil } from 'rxjs/operators';
import { BusinessPhasesServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'createOrEditBusinessPhaseModal',
  templateUrl: './create-or-edit-businessPhase-modal.component.html',
})
export class CreateOrEditBusinessPhaseModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('nameRef', { read: ElementRef }) nameRef: ElementRef;
  @ViewChild('descriptionRef', { read: ElementRef }) descriptionRef: ElementRef;
  active = false;
  saving = false;
  id: any;
  form: FormGroup;
  public destroy$ = new Subject<void>();
  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _businessPhasesServiceProxy: BusinessPhasesServiceProxy,
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
  show(id) {
    this.active = true;
    this.modal.show();
  }
  showEdit(id: string): void {
    this.active = true;
    this.modal.show();
    this._businessPhasesServiceProxy
      .getBusinessPhaseForEdit(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.createForm(result);
      });
  }
  save() {
    this.saving = true;
    if (this.form.valid) {
      this._businessPhasesServiceProxy
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

  shortCutOnEnter(position) {
    switch (position) {
        case 'nameRef':
            this.descriptionRef.nativeElement.focus();
            break;
        default:
            break;
    }
}
}
