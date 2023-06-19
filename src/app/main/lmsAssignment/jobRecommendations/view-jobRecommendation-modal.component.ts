import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetJobRecommendationForViewDto, JobRecommendationDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  selector: 'viewJobRecommendationModal',
  templateUrl: './view-jobRecommendation-modal.component.html',
})
export class ViewJobRecommendationModalComponent extends AppComponentBase {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;

  item: GetJobRecommendationForViewDto;

  constructor(injector: Injector) {
    super(injector);
    this.item = new GetJobRecommendationForViewDto();
    this.item.jobRecommendation = new JobRecommendationDto();
  }

  show(item: GetJobRecommendationForViewDto): void {
    this.item = item;
    this.active = true;
    this.modal.show();
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }
}
