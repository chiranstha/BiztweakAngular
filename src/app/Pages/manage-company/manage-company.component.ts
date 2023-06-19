import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  selector: 'app-manage-company',
  templateUrl: './manage-company.component.html',
  styleUrls: ['./manage-company.component.scss']
})
export class ManageCompanyComponent extends AppComponentBase implements OnInit {
  form: FormGroup;
  constructor(
    private router: Router,
    injector: Injector,
    private fb: FormBuilder
  ) {
    super(injector);
  }
  ngOnInit(): void {
this.createForm();
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
  createForm(item: any = {}) {
    this.form = this.fb.group({
      id: [item.id ? item.id : this.emptyguId],
      name: [item.name ? item.name : '', Validators.required],
      location: [item.location ? item.location : '', Validators.required],
      employees: [item.employees ? item.employees : '', Validators.required],
      annualTurnover: [item.annualTurnover ? item.annualTurnover : '', Validators.required],
      monthlyTurnover: [item.monthlyTurnover ? item.monthlyTurnover : '', Validators.required],
      productService: [item.productService ? item.productService : '', Validators.required],
    });
  }
  navigateToHealthReport(){
    this.router.navigate(['/healthReport']);
  }
}
