import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetDigitalResourceForViewDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  selector: 'viewDigitalResourceModal',
  templateUrl: './view-digitalResource-modal.component.html',
})
export class ViewDigitalResourceModalComponent extends AppComponentBase {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;

  item: GetDigitalResourceForViewDto;

  constructor(injector: Injector) {
    super(injector);
    this.item = new GetDigitalResourceForViewDto();
    // this.item = new DigitalResourceDto();
  }

  show(item: GetDigitalResourceForViewDto): void {
    this.item = item;
    this.active = true;
    this.modal.show();
  }

  getDownloadUrl(id: string): string {
    return AppConsts.remoteServiceBaseUrl + '/File/DownloadBinaryFile?id=' + id;
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }
}
