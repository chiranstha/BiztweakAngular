import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize, takeUntil } from 'rxjs/operators';
import { BankServiceProxy, CreateOrEditBankDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'createOrEditBankModal',
  templateUrl: './create-or-edit-bank-modal.component.html',
})
export class CreateOrEditBankModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  public destroy$ = new Subject<void>();
  active = false;
  saving = false;

  form: FormGroup;
  id: any;
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private _bankServiceProxy: BankServiceProxy,
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
        name: [item.name ? item.name : ''],
        shortDescription: [item.shortDescription ? item.shortDescription : '', Validators.required],
    });
}
show(){
  this.active = true;
  this.modal.show();
}
showEdit(id: string): void {
  this.active = true;
  this.modal.show();
  this._bankServiceProxy
    .getBankForEdit(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((result) => {
      this.createForm(result);
    });
}
  // show(bankId?: string): void {
  //   if (!bankId) {
  //     this.bank = new CreateOrEditBankDto();
  //     this.bank.id = bankId;

  //     this.active = true;
  //     this.modal.show();
  //   } else {
  //     this._bankServiceProxy.getBankForEdit(bankId).subscribe((result) => {
  //       this.bank = result;

  //       this.active = true;
  //       this.modal.show();
  //     });
  //   }
  // }

  save(): void {
    this.saving = true;
    this._bankServiceProxy
      .createOrEdit( this.form.getRawValue())
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.close();
        this.form.reset();
        this.saving = false;
        this.modalSave.emit(null);
      });
  }
  close(): void {
    this.active = false;
    this.modal.hide();
  }


}
