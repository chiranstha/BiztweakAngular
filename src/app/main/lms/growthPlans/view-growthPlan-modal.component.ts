import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetGrowthPlanForViewDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  selector: 'viewGrowthPlanModal',
  templateUrl: './view-growthPlan-modal.component.html',
})
export class ViewGrowthPlanModalComponent extends AppComponentBase {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;

  item: GetGrowthPlanForViewDto;

  constructor(injector: Injector) {
    super(injector);
    this.item = new GetGrowthPlanForViewDto();
    // this.item = new GrowthPlanDto();
  }

  show(item: GetGrowthPlanForViewDto): void {
    this.item = item;
    this.active = true;
    this.modal.show();
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }
}
