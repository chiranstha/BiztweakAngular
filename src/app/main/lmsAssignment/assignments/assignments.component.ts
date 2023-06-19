import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsServiceProxy, GetAssignmentForViewDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateOrEditAssignmentModalComponent } from './create-or-edit-assignment-modal.component';

import { ViewAssignmentModalComponent } from './view-assignment-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Paginator } from 'primeng/paginator';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { filter as _filter } from 'lodash-es';

import { IBizTweakPaginator } from '@app/shared/common/paginator/paginator.component';

@Component({
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignment.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
})
export class AssignmentsComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditAssignmentModal', { static: true })
  createOrEditAssignmentModal: CreateOrEditAssignmentModalComponent;
  @ViewChild('viewAssignmentModalComponent', { static: true }) viewAssignmentModal: ViewAssignmentModalComponent;

  // @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  filteredString = '';
  advancedFiltersAreShown = false;
  filterText = '';
  assignmentCategoryNameFilter = '';
  sorting: any;
  skipCout: any;
  maxCount: any;
  totalCount: number;
  id: any;
  assignmentData: GetAssignmentForViewDto[];
  constructor(
    injector: Injector,
    private router: Router,
    private route: ActivatedRoute,
    private _assignmentsServiceProxy: AssignmentsServiceProxy,
    private _fileDownloadService: FileDownloadService,

  ) {
    super(injector);
  }
  ngOnInit(): void {
  this.id = this.route.snapshot.params['id'];
  this.getAssignments();
  }
getAssignments(event?: IBizTweakPaginator){
  this._assignmentsServiceProxy.getAll(this.filterText, this.sorting, this.biztweakRpag.skipCount, this.biztweakRpag.itemSize).subscribe((res) => {
    this.totalCount = res.totalCount;
    this.assignmentData = res.items;
    console.log('Assignment:::', this.assignmentData);
  });
}
  createAssignment(): void {
    this.createOrEditAssignmentModal.show();
  }

  deleteAssignment(id: string): void {
    this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
      if (isConfirmed) {
        this._assignmentsServiceProxy.delete(id).subscribe(() => {
   this.getAssignments();
          this.notify.success(this.l('SuccessfullyDeleted'));
        });
      }
    });
  }

  exportToExcel(): void {
    this._assignmentsServiceProxy
      .getAssignmentsToExcel(this.filterText)
      .subscribe((result) => {
        this._fileDownloadService.downloadTempFile(result);
      });
  }
  navigateToJob(id: string){
    this.router.navigate(['/app/main/lmsAssignment/jobRecommendations', id]);
  }
  navigateToRecommendation(id: string){
    this.router.navigate(['/app/main/lmsAssignment/courseRecommendations', id]);
  }
}
