import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetEntrepreneurAssignmentForViewDto, EntrepreneurAssignmentDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  selector: 'viewEntrepreneurAssigmentModal',
  templateUrl: './view-entrepreneurAssigment-modal.component.html',
})
export class ViewEntrepreneurAssigmentModalComponent extends AppComponentBase {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;

  item: GetEntrepreneurAssignmentForViewDto;

  constructor(injector: Injector) {
    super(injector);
    this.item = new GetEntrepreneurAssignmentForViewDto();
  }

  show(item: GetEntrepreneurAssignmentForViewDto): void {
    this.item = item;
    this.active = true;
    this.modal.show();
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }
}
