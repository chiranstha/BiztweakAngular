import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import {
  EnterpreneurAssigmentServiceProxy,
  CreateOrEditEnterpreneurAssigmentDto,
  EnterpreneurAssigmentAssignmentLookupTableDto,
  EnterpreneurAssigmentAssignmentOptionLookupTableDto,
  EnterpreneurAssigmentEntrepreneurLookupTableDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
  selector: 'createOrEditEnterpreneurAssigmentModal',
  templateUrl: './create-or-edit-enterpreneurAssigment-modal.component.html',
})
export class CreateOrEditEnterpreneurAssigmentModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;

  enterpreneurAssigment: CreateOrEditEnterpreneurAssigmentDto = new CreateOrEditEnterpreneurAssigmentDto();

  assignmentName = '';
  assignmentOptionName = '';
  entrepreneurName = '';

  allAssignments: EnterpreneurAssigmentAssignmentLookupTableDto[];
  allAssignmentOptions: EnterpreneurAssigmentAssignmentOptionLookupTableDto[];
  allEntrepreneurs: EnterpreneurAssigmentEntrepreneurLookupTableDto[];

  constructor(
    injector: Injector,
    private _enterpreneurAssigmentServiceProxy: EnterpreneurAssigmentServiceProxy,
    private _dateTimeService: DateTimeService
  ) {
    super(injector);
  }

  show(enterpreneurAssigmentId?: string): void {
    if (!enterpreneurAssigmentId) {
      this.enterpreneurAssigment = new CreateOrEditEnterpreneurAssigmentDto();
      this.enterpreneurAssigment.id = enterpreneurAssigmentId;
      this.assignmentName = '';
      this.assignmentOptionName = '';
      this.entrepreneurName = '';

      this.active = true;
      this.modal.show();
    } else {
      this._enterpreneurAssigmentServiceProxy
        .getEnterpreneurAssigmentForEdit(enterpreneurAssigmentId)
        .subscribe((result) => {
          this.enterpreneurAssigment = result.enterpreneurAssigment;

          this.assignmentName = result.assignmentName;
          this.assignmentOptionName = result.assignmentOptionName;
          this.entrepreneurName = result.entrepreneurName;

          this.active = true;
          this.modal.show();
        });
    }
    this._enterpreneurAssigmentServiceProxy.getAllAssignmentForTableDropdown().subscribe((result) => {
      this.allAssignments = result;
    });
    this._enterpreneurAssigmentServiceProxy.getAllAssignmentOptionForTableDropdown().subscribe((result) => {
      this.allAssignmentOptions = result;
    });
    this._enterpreneurAssigmentServiceProxy.getAllEntrepreneurForTableDropdown().subscribe((result) => {
      this.allEntrepreneurs = result;
    });
  }

  save(): void {
    this.saving = true;

    this._enterpreneurAssigmentServiceProxy
      .createOrEdit(this.enterpreneurAssigment)
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

  ngOnInit(): void {}
}
