import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-BusinessHealthReport',
  templateUrl: './BusinessHealthReport.component.html',
  styleUrls: ['./BusinessHealthReport.component.scss']
})
export class BusinessHealthReportComponent implements OnInit {
  form: FormGroup;
  emptyguId: any;
  constructor( private fb: FormBuilder) { }

  ngOnInit() {
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
      email: [item.email ? item.email : '', Validators.required],
      phone: [item.phone ? item.phone : '', Validators.required],
  })
}
}
