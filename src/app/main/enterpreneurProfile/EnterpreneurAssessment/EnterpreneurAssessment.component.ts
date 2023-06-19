import { Component, Injector, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EntrepreneurAssignmentServiceProxy,
  EntrepreneurProfileServiceProxy,
  GetAllEntrepreneurAssignmentListDto,
  GetCompanyForEditOutput,
  GetCompanyForViewDto,
} from '@shared/service-proxies/service-proxies';
import { forEach } from 'lodash';
import { finalize, Subject, takeUntil } from 'rxjs';
// import { EnterpreneurCourseProfileModule } from '../enterpreneurCourseProfile/enterpreneurCourseProfile.module';
import { AppComponentBase } from '@shared/common/app-component-base';
@Component({
  selector: 'app-EnterpreneurAssessment',
  templateUrl: './EnterpreneurAssessment.component.html',
  styleUrls: ['./EnterpreneurAssessment.component.scss'],
})
export class EnterpreneurAssessmentComponent extends AppComponentBase implements OnInit {
  enterpreneurAssessments: GetAllEntrepreneurAssignmentListDto[];
  selectedOptions = [];
  id: any;
  companyList: GetCompanyForViewDto[];
  saving = false;
  companyInfo: GetCompanyForEditOutput;
  public destroy$ = new Subject<void>();
  form: FormGroup;
  emptyguId: any;
  isInputDisabled = false;
  notify: any;
  empIndex: number;
  assignIndex: number;
  constructor(
    injector: Injector,
    private _proxy: EntrepreneurAssignmentServiceProxy,
    private _enterprenureProfile: EntrepreneurProfileServiceProxy,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    super(injector);
  }

  getcategoryDetail(): FormArray {
    return this.form.get('categoryDetail') as FormArray;
  }
  assignmentDetail(empIndex: number): FormArray {
    return this.getcategoryDetail().at(empIndex).get('assignmentDetail') as FormArray;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    const items = document.querySelectorAll('.accordion button');
    function toggleAccordion() {
      const itemToggle = this.getAttribute('aria-expanded');
      for (let i = 0; i < items.length; i++) {
        items[i].setAttribute('aria-expanded', 'false');
      }

      if (itemToggle === 'false') {
        this.setAttribute('aria-expanded', 'true');
      }
    }
    items.forEach((item) => item.addEventListener('click', toggleAccordion));
    this.getEnterpreneurAssessment(this.id);
    this.getCompanyInfo();
    this.createForm();
    this.getAllCompany();
  }
  getAllCompany() {
    this._enterprenureProfile.getAllCompany().subscribe((result) => {
      this.companyList = result;
      forEach(this.companyList, (item) => {
        if (item.name === '') {
          if (!item.isAssignment) {
            this.router.navigate(['app/main/EnterpreneurAssessment', item.id]);
          } else {
            this.notify.error('Please Add  a company Information');
            this.router.navigate(['/app/main/EnterpreneurCompany', item.id]);
          }
        }
      });
    });
  }
  getCompanyInfo() {
    this._enterprenureProfile.getCompany(this.id).subscribe((result) => {
      this.companyInfo = result;
      console.log('CompanyInfo:::', this.companyInfo);
    });
  }
  removeAssignmentDetail(empIndex: number, assignIndex: number) {
    const assignmentDetailArray = this.getcategoryDetail().controls[empIndex].get('assignmentDetail') as FormArray;
    assignmentDetailArray.controls[assignIndex].get('isHidden').setValue(true);
  }

  createForm(item: any = {}) {
    this.form = this.fb.group({
      companyId: [this.id],
      categoryDetail: this.fb.array(
        (() => {
          if (!item.categoryDetail) {
            return [this.createcategoryDetail()];
          }
          return item.categoryDetail.map((item) => this.createcategoryDetail(item));
        })()
      ),
    });
  }
  createcategoryDetail(item: any = {}) {
    return this.fb.group({
      categoryId: [item.categoryId ? item.categoryId : ''],
      categoryName: [item.categoryName ? item.categoryName : ''],
      assignmentDetail: this.fb.array(
        (() => {
          if (!item.assignmentDetail) {
            return [this.createassignmentDetailForm()];
          }
          return item.assignmentDetail.map((item) => this.createassignmentDetailForm(item));
        })()
      ),
    });
  }
  createassignmentDetailForm(item: any = {}) {
    return this.fb.group({
      assignmentId: [item.assignmentId ? item.assignmentId : ''],
      assignmentName: [item.assignmentName ? item.assignmentName : ''],
      assignmentDescription: [item.assignmentDescription ? item.assignmentDescription : ''],
      isHidden: [false, Validators.required],
      isOptionSelected: [item.isOptionSelected ? item.isOptionSelected : false, Validators.required],
    });
  }

  getEnterpreneurAssessment(id) {
    this._proxy.getAllAssignment(id).subscribe((res) => {
      this.enterpreneurAssessments = res.categoryDetail;
      this.createForm(res);
    });
  }

  toggleAccordion(event) {
    const button = event.currentTarget;
    const content = button.nextElementSibling;
    const icons = document.querySelectorAll('.icon');

    for (let i = 0; i < icons.length; i++) {
      icons[i].classList.remove('expanded');
    }

    if (button.getAttribute('aria-expanded') === 'false') {
      button.setAttribute('aria-expanded', 'true');
      content.classList.add('expanded');
    } else {
      button.setAttribute('aria-expanded', 'false');
      content.classList.remove('expanded');
    }
  }
  Select(empIndex: number, assignIndex: number, optionIndex: number): void {
    const options = this.assignmentDetail(empIndex).controls;
    options.forEach((option, index) => {
      if (index === optionIndex) {
        option.get('isOptionSelected').setValue(true);
      } else {
        option.get('isOptionSelected').setValue(false);
      }
    });
  }
  updateOptionSelected(control: AbstractControl, value: boolean) {
    control.setValue(value);
  }
  save() {
    // this.form.controls.categoryDetail.value.forEach((item): void => {
    //   if (item.isHidden) {
    //     this.saving = false;
    //     this.notify.error(item.assignmentName );

    //   }
    // });
    // if (this.saving) {
      this._proxy
        .createEntrepreneurAssignment(this.form.getRawValue())
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => (this.saving = false))
        )
        .subscribe(() => {
          this.notify.success('Saved Successfully');
          console.log('Success');
          this.router.navigate(['/app/main/EnterpreneurCompany', this.id]);
        });
   // }
  }
  NavigateToReportSummary(id: string) {
    this.router.navigate(['/app/main/ReportSummary', id]);
  }
}
