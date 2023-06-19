import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { BusinessPhasesServiceProxy, GetBusinessPhaseForViewDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateOrEditBusinessPhaseModalComponent } from './create-or-edit-businessPhase-modal.component';

import { ViewBusinessPhaseModalComponent } from './view-businessPhase-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { filter as _filter } from 'lodash-es';
import { IBizTweakPaginator } from '@app/shared/common/paginator/paginator.component';


@Component({
  templateUrl: './businessPhases.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
})
export class BusinessPhasesComponent extends AppComponentBase  implements OnInit{
  @ViewChild('createOrEditBusinessPhaseModal', { static: true })
  createOrEditBusinessPhaseModal: CreateOrEditBusinessPhaseModalComponent;
  @ViewChild('viewBusinessPhaseModalComponent', { static: true })
  viewBusinessPhaseModal: ViewBusinessPhaseModalComponent;
  advancedFiltersAreShown = false;
  descriptionFilter = '';
  filterText = '';
  sorting: any;
id: any;
skipCout: any;
totalCount: any;
businessPhaseData: GetBusinessPhaseForViewDto[];
maxCount: any;
  constructor(
    injector: Injector,
    private _businessPhasesServiceProxy: BusinessPhasesServiceProxy,
  ) {
    super(injector);
  }
  ngOnInit(): void {
this.getBusinessPhase();
  }
 getBusinessPhase(event?: IBizTweakPaginator){
  this._businessPhasesServiceProxy.getAll(this.filterText, this.descriptionFilter, this.sorting, this.biztweakRpag.skipCount, this.biztweakRpag.itemSize).subscribe(res => {
    this.totalCount = res.totalCount;
    this.businessPhaseData = res.items;
    console.log('BusinessPhaseData', this.businessPhaseData);
  });
 }
  createBusinessPhase(): void {
    this.createOrEditBusinessPhaseModal.show(this.id);
  }

  deleteBusinessPhase(id: string): void {
    this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
      if (isConfirmed) {
        this._businessPhasesServiceProxy.delete(id).subscribe(() => {
      this.getBusinessPhase();
          this.notify.success(this.l('SuccessfullyDeleted'));
        });
      }
    });
  }
}
