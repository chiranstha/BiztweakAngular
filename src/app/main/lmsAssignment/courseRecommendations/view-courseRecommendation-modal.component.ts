import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetCourseRecommendationForViewDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  selector: 'viewCourseRecommendationModal',
  templateUrl: './view-courseRecommendation-modal.component.html',
})
export class ViewCourseRecommendationModalComponent extends AppComponentBase {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;

  item: GetCourseRecommendationForViewDto;

  constructor(injector: Injector) {
    super(injector);
    this.item = new GetCourseRecommendationForViewDto();
  }

  show(item: GetCourseRecommendationForViewDto): void {
    this.item = item;
    this.active = true;
    this.modal.show();
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }
}
