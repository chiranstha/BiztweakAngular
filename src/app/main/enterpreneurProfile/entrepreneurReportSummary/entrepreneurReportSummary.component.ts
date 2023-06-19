import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/common/app-component-base';
import { EntrepreneurAssignmentServiceProxy, EntrepreneurProfileServiceProxy, GetAllEntrepreneurGrowthListDto, GetAllJobRecommendationViewDto, GetAllModuleRecommendationViewDto, GetCompanyForEditOutput, GetCompanyForViewDto } from '@shared/service-proxies/service-proxies';
import { entrepreneurCoursemodalComponent } from './entrepreneurReportSummary-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { forEach } from 'lodash-es';

@Component({
  selector: 'app-entrepreneurReportSummary',
  templateUrl: './entrepreneurReportSummary.component.html',
  styleUrls: ['./entrepreneurReportSummary.component.scss']
})
export class EntrepreneurReportSummaryComponent extends AppComponentBase  implements   OnInit {
  @ViewChild('entrepreneurCoursemodal', { static: true })
  entrepreneurCoursemodal: entrepreneurCoursemodalComponent;
  @Input() title: string;
  form: FormGroup;
id: any;
imageUrl: any;
companyList: GetCompanyForViewDto[];
isExpanded = false;
companyInfo: GetCompanyForEditOutput;
  GrowthPlanReport: GetAllEntrepreneurGrowthListDto[];
  view: any[] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  // xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Sales(% of 0-100)';
  colorScheme = {
    domain: ['#1fbec8', '#1fbec8', '#1fbec8', '#1fbec8', '#1fbec8', '#1fbec8']
  };
  jobData: GetAllJobRecommendationViewDto[];
  moduleRecommendationdata: GetAllModuleRecommendationViewDto[]
  ;
public single = [];
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _proxy: EntrepreneurAssignmentServiceProxy,
    private _proxy2: EntrepreneurProfileServiceProxy,
    injector: Injector, ) {
  super(injector);
}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.EntrepreneurGrowthSummary(this.id);
    this.getGrowthPlanReport(this.id);
    this.getJobrecommendation(this.id);
    this.getModulerecommendation(this.id);
    this.createForm();
    this.getAllCompany();
    const items = document.querySelectorAll('.accordion button');


  }
  createForm(item: any = {}) {
    this.form = this.fb.group({
      id: [item.id ? item.id : ''],
      name: [item.name ? item.name : '', Validators.required],
      email: [item.description ? item.description : '', [Validators.required, Validators.email]],
      phone: [item.phone ? item.phone : '', Validators.required],
    });
  }
  EntrepreneurGrowthSummary(id: any){
    this._proxy.getEntrepreneurGrowthSummary(id).subscribe(res => {
      this.single = res;
      console.log('Single', this.single);
    });
  }
getGrowthPlanReport(id: any){
  this._proxy.getEntrepreneurGrowthPlan(id).subscribe(res => {
    this.GrowthPlanReport = res;
    console.log('GrowthPlan', this.GrowthPlanReport);
  });
}
getModulerecommendation(id: any){
  this._proxy.getAllModuleRecommendation(id).subscribe(res => {
    this.moduleRecommendationdata = res;
    console.log('moduleRecommendationdata:::', this.moduleRecommendationdata);
  });
}
toggleAccordion() {
  this.isExpanded = !this.isExpanded;
}
getAllCompany() {
  this._proxy2.getAllCompany().subscribe((result) => {
    this.companyList = result;
    console.log('CompanyList:::', this.companyList);

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

getJobrecommendation(id: any){
  this._proxy.getAllJobRecommendation(id).subscribe(res => {
    this.jobData = res;
    console.log('JobDATA::::', this.jobData);
  });
}
NavigateToReportSummary(id: string ){
  this.router.navigate(['app/main/ReportSummary', id]);
  this.EntrepreneurGrowthSummary(id);
  this.getGrowthPlanReport(id);
}
}
