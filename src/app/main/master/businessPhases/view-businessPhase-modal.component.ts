import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetBusinessPhaseForViewDto, BusinessPhaseDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  selector: 'viewBusinessPhaseModal',
  templateUrl: './view-businessPhase-modal.component.html',
})
export class ViewBusinessPhaseModalComponent extends AppComponentBase {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;

  item: GetBusinessPhaseForViewDto;

  constructor(injector: Injector) {
    super(injector);
    this.item = new GetBusinessPhaseForViewDto();
    this.item.businessPhase = new BusinessPhaseDto();
  }

  show(item: GetBusinessPhaseForViewDto): void {
    this.item = item;
    this.active = true;
    this.modal.show();
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }
}
