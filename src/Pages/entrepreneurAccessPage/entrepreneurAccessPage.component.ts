import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-entrepreneurAccessPage',
  templateUrl: './entrepreneurAccessPage.component.html',
  styleUrls: ['./entrepreneurAccessPage.component.scss']
})
export class EntrepreneurAccessPageComponent implements OnInit {
  // @ViewChild('entrepreneurAccessModal', { static: true }) entrepreneurAccessModal: entrepreneurAccessModalComponent;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private router: Router) { }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
 }
 hideModel(){
  this.modalRef.hide();
 }
  ngOnInit() {
    const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');
  
  for (let i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
  }
  
  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }
}

items.forEach(item => item.addEventListener('click', toggleAccordion));
  }
  NavigateToAssessmant(){
    this.router.navigate(['/entrepreneurAssessments']);
  }
}
