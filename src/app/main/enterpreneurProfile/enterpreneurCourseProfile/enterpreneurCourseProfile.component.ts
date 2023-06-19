import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { enterpreneurCompanymodalComponent } from './enterpreneurCompany-modal.component';
import { AppComponentBase } from '@shared/common/app-component-base';
import { EntrepreneurProfileServiceProxy, GetCompanyForViewDto, GetEntrepreneurProfileViewDto } from '@shared/service-proxies/service-proxies';
import { Observable } from 'rxjs';
import { forEach } from 'lodash-es';

@Component({
  selector: 'app-enterpreneurCourseProfile',
  templateUrl: './enterpreneurCourseProfile.component.html',
  styleUrls: ['./enterpreneurCourseProfile.component.scss']
})
export class EnterpreneurCourseProfileComponent extends AppComponentBase implements OnInit {
  @ViewChild('enterpreneurCompanymodal', { static: true })
  enterpreneurCompanymodal: enterpreneurCompanymodalComponent;
  entrepeneureProfile: GetEntrepreneurProfileViewDto;
  id: any;
  companyList: GetCompanyForViewDto[];
  constructor(injector: Injector,
    private _proxy: EntrepreneurProfileServiceProxy,
    private router: Router) {
    super(injector);
  }
  ngOnInit() {
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

   this.getAllCompany();

  }
  navigate() {
    this.router.navigate(['/app/main/EnterpreneurCompany']);
  }
  getAllEnterpreneurProfile() {
    this._proxy.getEntrepreneurProfile().subscribe((result) => {
      this.entrepeneureProfile = result;
      if (!this.entrepeneureProfile.isCompany) {
        this.enterpreneurCompanymodal.show();
      }
    });
  }
  getAllCompany() {
    this._proxy.getAllCompany().subscribe((result) => {
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
  navigateToViewReport(id: string){
    this.router.navigate(['app/main/ReportSummary', id]);
  }
}
