import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import {
  EntrepreneurAssignmentServiceProxy,
  CreateOrEditEntrepreneurAssignmentDto,
  EntrepreneurAssignmentAssignmentTableDto,
  EntrepreneurAssignmentAssignmentOptionTableDto,
  EntrepreneurAssignmentEntrepreneurTableDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
  selector: 'createOrEditEntrepreneurAssigmentModal',
  templateUrl: './create-or-edit-entrepreneurAssigment-modal.component.html',
})
export class CreateOrEditEntrepreneurAssigmentModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;



  allAssignments: EntrepreneurAssignmentAssignmentTableDto[];
  allAssignmentOptions: EntrepreneurAssignmentAssignmentOptionTableDto[];
  allEntrepreneurs: EntrepreneurAssignmentEntrepreneurTableDto[];

  constructor(
    injector: Injector,
    private _entrepreneurAssigmentServiceProxy: EntrepreneurAssignmentServiceProxy,
    private _dateTimeService: DateTimeService
  ) {
    super(injector);
  }

  show(entrepreneurAssigmentId?: string): void {
    if (!entrepreneurAssigmentId) {
      this.active = true;
      this.modal.show();
    } else {
      this._entrepreneurAssigmentServiceProxy
        .getEntrepreneurAssignmentForEdit(entrepreneurAssigmentId)
        .subscribe((result) => {
          this.active = true;
          this.modal.show();
        });
    }
    this._entrepreneurAssigmentServiceProxy.getAllAssignmentForTableDropdown().subscribe((result) => {
      this.allAssignments = result;
    });
    this._entrepreneurAssigmentServiceProxy.getAllAssignmentOptionForTableDropdown().subscribe((result) => {
      this.allAssignmentOptions = result;
    });
    this._entrepreneurAssigmentServiceProxy.getAllEntrepreneurForTableDropdown().subscribe((result) => {
      this.allEntrepreneurs = result;
    });
  }

  save(): void {
    this.saving = true;

    // this._entrepreneurAssigmentServiceProxy
    //   .createOrEdit('55')
    //   .pipe(
    //     finalize(() => {
    //       this.saving = false;
    //     })
    //   )
    //   .subscribe(() => {
    //     this.notify.info(this.l('SavedSuccessfully'));
    //     this.close();
    //     this.modalSave.emit(null);
    //   });
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }

  ngOnInit(): void {}
}
