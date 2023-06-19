import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {
  GetEntrepreneurAttendanceForViewDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  selector: 'viewEntrepreneurAttendanceModal',
  templateUrl: './view-entrepreneurAttendance-modal.component.html',
})
export class ViewEntrepreneurAttendanceModalComponent extends AppComponentBase {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;

  item: GetEntrepreneurAttendanceForViewDto;

  constructor(injector: Injector) {
    super(injector);
    // this.item = new GetEntrepreneurAttendanceForViewDto();
    // this.item = new EntrepreneurAttendanceDto();
  }

  show(item: GetEntrepreneurAttendanceForViewDto): void {
    this.item = item;
    this.active = true;
    this.modal.show();
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }
}
