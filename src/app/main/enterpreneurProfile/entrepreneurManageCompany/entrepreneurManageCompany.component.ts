import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { EntrepreneurProfileServiceProxy, GetCompanyForEditOutput, GetCompanyForViewDto } from '@shared/service-proxies/service-proxies';
import { forEach } from 'lodash-es';

@Component({
  selector: 'app-entrepreneurManageCompany',
  templateUrl: './entrepreneurManageCompany.component.html',
  styleUrls: ['./entrepreneurManageCompany.component.scss']
})
export class EntrepreneurManageCompanyComponent extends AppComponentBase  implements OnInit {
  companyInfo: GetCompanyForEditOutput;
  id: string;
  companyList: GetCompanyForViewDto[];
  constructor(injector: Injector, private router: Router,  private _proxy: EntrepreneurProfileServiceProxy,
    private route: ActivatedRoute) {
      super(injector);
     }

  ngOnInit(): void {

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
    items.forEach(item => item.addEventListener('click', toggleAccordion));
   this.getAllCompany();
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
  NavigateToReportSummary(id: string) {
    this.router.navigate(['/app/main/ReportSummary', this.id]);
  }

}
