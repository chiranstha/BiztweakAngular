import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CompanyServiceProxy, EntrepreneurAssignmentServiceProxy, GetAllEntrepreneurGrowthListDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-entrepreneurSubmitted',
  templateUrl: './entrepreneurSubmitted.component.html',
  styleUrls: ['./entrepreneurSubmitted.component.css']
})
export class EntrepreneurSubmittedComponent extends AppComponentBase implements OnInit{
id: any;
Submitteddata: any;
view: any[] = [1200, 500];
showXAxis = true;
showYAxis = true;
gradient = true;
showLegend = true;
showXAxisLabel = true;
// xAxisLabel = 'Country';
showYAxisLabel = true;
public single = [];
yAxisLabel = 'Sales(% of 0-100)';
colorScheme = {
  domain: ['#1fbec8', '#1fbec8', '#1fbec8', '#1fbec8', '#1fbec8', '#1fbec8']
};
GrowthPlanReport: GetAllEntrepreneurGrowthListDto[];
  constructor(
        injector: Injector,
        private route: ActivatedRoute,
        private _proxy:CompanyServiceProxy
  ) {
        super(injector);
   }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.EntrepreneurGrowthSummary(this.id);
    this.getGrowthPlanReport(this.id);
  }

EntrepreneurGrowthSummary(id: any){
  this._proxy.getEntrepreneurGrowthSummary(id).subscribe(res => {
    this.single = res;
    // console.log('Single', this.single);
  });
}
getGrowthPlanReport(id: any){
  this._proxy.getEntrepreneurGrowthPlan(id).subscribe(res => {
    this.GrowthPlanReport = res;
    console.log('GrowthPlan', this.GrowthPlanReport);
  });
}
}
