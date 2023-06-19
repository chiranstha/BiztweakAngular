import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { AssignmentCategoriesServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateOrEditAssignmentCategoryModalComponent } from './create-or-edit-assignmentCategory-modal.component';

import { ViewAssignmentCategoryModalComponent } from './view-assignmentCategory-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { filter as _filter } from 'lodash-es';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IBizTweakPaginator } from '@app/shared/common/paginator/paginator.component';

@Component({
  templateUrl: './assignmentCategories.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
})
export class AssignmentCategoriesComponent extends AppComponentBase  implements OnInit{
  @ViewChild('createOrEditAssignmentCategoryModal', { static: true })
  createOrEditAssignmentCategoryModal: CreateOrEditAssignmentCategoryModalComponent;
  @ViewChild('viewAssignmentCategoryModalComponent', { static: true })
  viewAssignmentCategoryModal: ViewAssignmentCategoryModalComponent;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  advancedFiltersAreShown = false;
  filterText = '';
form: FormGroup;
totalcount: any;
assignmentCategoryData: any;
sorting: any;
skipCout: any;
maxCount: any;
id: any;
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private _assignmentCategoriesServiceProxy: AssignmentCategoriesServiceProxy,
  
    private _fileDownloadService: FileDownloadService,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.getAssignmentCategories();

  }
  getAssignmentCategories(event?: IBizTweakPaginator){
    this._assignmentCategoriesServiceProxy.getAll(this.filterText, this.sorting, this.biztweakRpag.skipCount, this.biztweakRpag.itemSize).subscribe(res => {
      this.totalcount = res.totalCount;
      this.assignmentCategoryData = res.items;
      console.log("assignmentCategoryData", this.assignmentCategoryData);
    })
  }
  createAssignmentCategory(): void {
    this.createOrEditAssignmentCategoryModal.show(this.id);
  }
  deleteAssignmentCategory(id): void {
    this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
      if (isConfirmed) {
        this._assignmentCategoriesServiceProxy.delete(id).subscribe(() => {
          this.getAssignmentCategories();
          this.notify.success(this.l('SuccessfullyDeleted'));
        });
      }
    });
  }
  exportToExcel(): void {
    this._assignmentCategoriesServiceProxy.getAssignmentCategoriesToExcel(this.filterText).subscribe((result) => {
      this._fileDownloadService.downloadTempFile(result);
    });
  }
}
