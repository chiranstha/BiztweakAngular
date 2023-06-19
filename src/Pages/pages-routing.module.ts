import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BusinessHealthReportComponent } from './business-health-report/business-health-report.component';
import { CreateComponent } from './create/create.component';
import { EntrepreneurAccessPageComponent } from './entrepreneurAccessPage/entrepreneurAccessPage.component';
import { EntrepreneurAssessmentsComponent } from './entrepreneurAssessments/entrepreneurAssessments.component';
import { HomeComponent } from './home/home.component';
import { ManageCompanyComponent } from './manage-company/manage-company.component';
import { PagesComponent } from './Pages.component';
import { ReportSummaryComponent } from './reportSummary/reportSummary.component';
  @NgModule({
    imports: [

        RouterModule.forChild([
            {
                path: '',
                component: PagesComponent,
                children: [
                    {path: '', redirectTo: 'home', pathMatch: 'full'},
                    {path: 'home', component: HomeComponent},
                    {path: 'CompanyProfile', component: ManageCompanyComponent}, 
                    {path: 'create', component: CreateComponent}, 
                  
                    {path: 'entrepreneurAccessPage', component: EntrepreneurAccessPageComponent},
                    // {path: 'CompleteCompanyProfile', component: CompleteCompanyProfileComponent},
                    {path: 'entrepreneurAssessments', component: EntrepreneurAssessmentsComponent},
                    {path: 'healthReport', component: BusinessHealthReportComponent},
                    {path: 'reportSummary', component: ReportSummaryComponent},

                ]
            }
        ])
    ],
    exports: [RouterModule]
})
  export class PagesRoutingModule { }

