import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetAssignmentCategoryForViewDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  selector: 'viewAssignmentCategoryModal',
  templateUrl: './view-assignmentCategory-modal.component.html',
})
export class ViewAssignmentCategoryModalComponent extends AppComponentBase {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;

  item: GetAssignmentCategoryForViewDto;

  constructor(injector: Injector) {
    super(injector);
    this.item = new GetAssignmentCategoryForViewDto();
    // this.item.assignmentCategory = new AssignmentCategoryDto();
  }

  show(item: GetAssignmentCategoryForViewDto): void {
    this.item = item;
    this.active = true;
    this.modal.show();
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }
}
