﻿import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetEntrepreneurStateForViewDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  selector: 'viewEntrepreneurStateModal',
  templateUrl: './view-entrepreneurState-modal.component.html',
})
export class ViewEntrepreneurStateModalComponent extends AppComponentBase {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;

  item: GetEntrepreneurStateForViewDto;

  constructor(injector: Injector) {
    super(injector);
    this.item = new GetEntrepreneurStateForViewDto();
    // this.item = new EntrepreneurStateDto();
  }

  show(item: GetEntrepreneurStateForViewDto): void {
    this.item = item;
    this.active = true;
    this.modal.show();
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }
}
