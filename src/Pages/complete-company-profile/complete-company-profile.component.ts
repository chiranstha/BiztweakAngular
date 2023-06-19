import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  selector: 'app-complete-company-profile',
  templateUrl: './complete-company-profile.component.html',
  styleUrls: ['./complete-company-profile.component.scss']
})
export class CompleteCompanyProfileComponent extends AppComponentBase implements OnInit {
  form: FormGroup;
  constructor(
    injector: Injector,

    private fb: FormBuilder,
   
  ) {
    super(injector);
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  createForm(item: any = {}) {
    this.form = this.fb.group({
      id: [item.id ? item.id : this.emptyguId],
      name: [item.name ? item.name : '', Validators.required],
      location: [item.location ? item.location : '', Validators.required],
      isCompanyRegistered: [item.isCompanyRegistered ? item.isCompanyRegistered : false],
    });
  }
}
