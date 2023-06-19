import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetEnterpreneurAssigmentForViewDto, EnterpreneurAssigmentDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  selector: 'viewEnterpreneurAssigmentModal',
  templateUrl: './view-enterpreneurAssigment-modal.component.html',
})
export class ViewEnterpreneurAssigmentModalComponent extends AppComponentBase {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;

  item: GetEnterpreneurAssigmentForViewDto;

  constructor(injector: Injector) {
    super(injector);
    this.item = new GetEnterpreneurAssigmentForViewDto();
    this.item.enterpreneurAssigment = new EnterpreneurAssigmentDto();
  }

  show(item: GetEnterpreneurAssigmentForViewDto): void {
    this.item = item;
    this.active = true;
    this.modal.show();
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }
}
