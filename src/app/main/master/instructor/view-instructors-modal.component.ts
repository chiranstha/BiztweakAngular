import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetInstructorsForViewDto, UserTypeEnum } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  selector: 'viewInstructorsModal',
  templateUrl: './view-instructors-modal.component.html',
})
export class ViewInstructorsModalComponent extends AppComponentBase {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;

  item: GetInstructorsForViewDto;
  userTypeEnum = UserTypeEnum;

  constructor(injector: Injector) {
    super(injector);
    // this.item = new GetInstructorsForViewDto();
    // this.item.instructors = new InstructorsDto();
  }

  show(item: GetInstructorsForViewDto): void {
    this.item = item;
    this.active = true;
    this.modal.show();
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }
}
