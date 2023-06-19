import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetCourseCategoryForViewDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  selector: 'viewCourseCategoryModal',
  templateUrl: './view-courseCategory-modal.component.html',
})
export class ViewCourseCategoryModalComponent extends AppComponentBase {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;

  item: GetCourseCategoryForViewDto;

  constructor(injector: Injector) {
    super(injector);
    this.item = new GetCourseCategoryForViewDto();
    // this.item = new CourseCategoryDto();
  }

  show(item: GetCourseCategoryForViewDto): void {
    this.item = item;
    this.active = true;
    this.modal.show();
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }
}
