import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  selector: 'app-reportSummary',
  templateUrl: './reportSummary.component.html',
  styleUrls: ['./reportSummary.component.scss']
})
export class ReportSummaryComponent extends AppComponentBase  implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder,
    injector: Injector,) {  super(injector);}

  ngOnInit() {
    this.createForm();
    const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');
  
  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  } else {
    this.setAttribute('aria-expanded', 'false');
  }
}

for (let i = 0; i < items.length; i++) {
  items[i].addEventListener('click', toggleAccordion);
}
  }
  createForm(item: any = {}) {
    this.form = this.fb.group({
      id: [item.id ? item.id : ''],
      name: [item.name ? item.name : '', Validators.required],
      description: [item.description ? item.description : '', Validators.required]
    });
  }
}