import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { CourseCategoriesServiceProxy, GetCourseCategoryForViewDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateOrEditCourseCategoryModalComponent } from './create-or-edit-courseCategory-modal.component';

import { ViewCourseCategoryModalComponent } from './view-courseCategory-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { filter as _filter } from 'lodash-es';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { IBizTweakPaginator } from '@app/shared/common/paginator/paginator.component';
@Component({
  templateUrl: './courseCategories.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
})
export class CourseCategoriesComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditCourseCategoryModal', { static: true })
  createOrEditCourseCategoryModal: CreateOrEditCourseCategoryModalComponent;
  @ViewChild('viewCourseCategoryModalComponent', { static: true })
  viewCourseCategoryModal: ViewCourseCategoryModalComponent;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  advancedFiltersAreShown = false;
  filterText = '';
  course: GetCourseCategoryForViewDto[];
    totalCount: number;
    sorting: string;
  form: FormGroup;
  id: any;
  private readonly _OnDestroy$: Subject<void> = new Subject<void>();
  constructor(injector: Injector,
    private _proxy: CourseCategoriesServiceProxy, private fb: FormBuilder) {
    super(injector);
  }
  ngOnInit(): void {
    this.getCourseCategories();
  }
  getCourseCategories(event?: IBizTweakPaginator) {
   this._proxy .getAll(this.filterText, this.sorting, this.biztweakRpag.skipCount, this.biztweakRpag.itemSize)
   .subscribe((res) => {
      this.totalCount = res.totalCount;
      this.course = res.items;
      console.log('Course:::', this.course);
    });
  }


  reloadPage(): void {
    this.paginator.changePage(this.paginator.getPage());
  }

  createCourseCategory(): void {
    this.createOrEditCourseCategoryModal.show();
  }
  deletecourse(id) {
    this.message.confirm('', 'Are you sure you want to Delete ?', (isConfirm) => {
      if (isConfirm) {
        this._proxy
          .delete(id)
          .pipe(takeUntil(this._OnDestroy$))
          .subscribe(() => {
            this.getCourseCategories();
            this.notify.success(this.l('Successfully Deleted'));
          });
      }
    });
  }
}
