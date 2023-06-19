import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize, takeUntil } from 'rxjs/operators';
import { IndustriesServiceProxy, CreateOrEditIndustryDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'createOrEditIndustryModal',
  templateUrl: './create-or-edit-industry-modal.component.html',
})
export class CreateOrEditIndustryModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('nameRef', { read: ElementRef }) nameRef: ElementRef;
  @ViewChild('shortDesRef', { read: ElementRef }) shortDesRef: ElementRef;
  active = false;
  saving = false;
  form: FormGroup;
  id: any;
  public destroy$ = new Subject<void>();
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private _industriesServiceProxy: IndustriesServiceProxy,
    private _dateTimeService: DateTimeService
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm(item: any = {}) {
    this.form = this.fb.group({
      id: [item.id ? item.id : this.emptyguId],
      name: [item.name ? item.name : '', Validators.required],
      shortDescription: [item.shortDescription ? item.shortDescription : ''],
    });
  }
  show(id?: string): void {
    this.active = true;
    this.modal.show();
  }
  showEdit(id: string): void {
    this.active = true;
    this.modal.show();
    this._industriesServiceProxy
      .getIndustryForEdit(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.createForm(result);
      });
  }
  shortCutOnEnter(position) {
    switch (position) {
        case 'nameRef':
          this.shortDesRef.nativeElement.focus();
            break;
        default:
            break;
    }
}


  save() {
    this.saving = true;
    if (this.form.valid) {
      this._industriesServiceProxy.createOrEdit(this.form.getRawValue()).subscribe(() => {
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
