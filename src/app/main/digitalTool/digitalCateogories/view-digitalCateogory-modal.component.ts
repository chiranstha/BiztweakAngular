import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetDigitalCateogoryForViewDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  selector: 'viewDigitalCateogoryModal',
  templateUrl: './view-digitalCateogory-modal.component.html',
})
export class ViewDigitalCateogoryModalComponent extends AppComponentBase {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;

  item: GetDigitalCateogoryForViewDto;

  constructor(injector: Injector) {
    super(injector);
    this.item = new GetDigitalCateogoryForViewDto();
    // this.item = new DigitalCateogoryDto();
  }

  show(item: GetDigitalCateogoryForViewDto): void {
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
