import { Component, Injector, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { EntrepreneurProfileServiceProxy, GetEntrepreneurProfileViewDto } from '@shared/service-proxies/service-proxies';
import { template } from 'lodash-es';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-EnterpreneurDashboard',
  templateUrl: './EnterpreneurDashboard.component.html',
  styleUrls: ['./EnterpreneurDashboard.component.css']
})
export class EnterpreneurDashboardComponent extends AppComponentBase implements OnInit {
  enterpreneurProfile: GetEntrepreneurProfileViewDto;
  modalRef: BsModalRef;

  // constructor(private injector: Injector,  _proxy: EntrepreneurProfileServiceProxy,



  constructor(private injector: Injector,
    private _proxy: EntrepreneurProfileServiceProxy,
    private modalService: BsModalService,

    private router: Router,
  ) {
    super(injector);
  }


  ngOnInit() {
    this._proxy.getEntrepreneurProfile().subscribe(res => {
      this.enterpreneurProfile = res;
      console.log('enterpreneurProfile', this.enterpreneurProfile.isAssignment);
      // if(this.enterpreneurProfile.isAssignment == false){
      //   this.router.navigate(['/app/main/EnterpreneurAssessment']);

      // }
    });

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
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  hideModel() {
    this.modalRef.hide();
  }



  NavigateToAssessmant() {
    this.router.navigate(['/entrepreneurAssessments']);
  }




}
