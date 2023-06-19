import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IndustriesServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateOrEditIndustryModalComponent } from './create-or-edit-industry-modal.component';

import { ViewIndustryModalComponent } from './view-industry-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { filter as _filter } from 'lodash-es';

import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';
import { IBizTweakPaginator } from '@app/shared/common/paginator/paginator.component';

@Component({
  templateUrl: './industries.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
})
export class IndustriesComponent extends AppComponentBase implements OnInit{
  @ViewChild('createOrEditIndustryModal', { static: true })
  createOrEditIndustryModal: CreateOrEditIndustryModalComponent;
  @ViewChild('viewIndustryModalComponent', { static: true }) viewIndustryModal: ViewIndustryModalComponent;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  filteredString: string ='';
  advancedFiltersAreShown = false;
  filterText = '';
  nameFilter = '';
  shortDescriptionFilter: number;
  form: FormGroup;
  totalCount: any;
  industryData: any;
  sorting: any;
skipCout: any;
maxCount: any;
id: any;
private readonly _OnDestroy$: Subject<void> = new Subject<void>();
  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private _industriesServiceProxy: IndustriesServiceProxy,
    private _fileDownloadService: FileDownloadService  ) {
    super(injector);
  }
  ngOnInit(): void {
this.id = this.route.snapshot.params['id'];
    this.getIndustries();
    this.form = new FormGroup({
      filterText: new FormControl('')
    });
  }
  getIndustries(event?: IBizTweakPaginator) {
    this._industriesServiceProxy.getAll(this.filterText, this.sorting, this.biztweakRpag.skipCount, this.biztweakRpag.itemSize).subscribe(res => {
      this.totalCount = res.totalCount;
      this.industryData = res.items;
      console.log('Industry data:::', this.industryData);
    })
  }
  

  reloadPage(): void {
    this.paginator.changePage(this.paginator.getPage());
  }

  createIndustry(): void {
    this.createOrEditIndustryModal.show();
  }

  deleteIndustries(id) {
    this.message.confirm('', 'Are you sure you want to Delete ?', (isConfirm) => {
      if (isConfirm) {
        this._industriesServiceProxy
          .delete(id)
          .pipe(takeUntil(this._OnDestroy$))
          .subscribe(() => {
            this.getIndustries();
            this.notify.success(this.l('Successfully Deleted'));
          });
      }
    });
  }

  exportToExcel(): void {
    this._industriesServiceProxy
      .getIndustriesToExcel(this.filterText)
      .subscribe((result) => {
        this._fileDownloadService.downloadTempFile(result);
      });
  }
}
