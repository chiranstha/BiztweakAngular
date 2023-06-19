import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { UserTypeEnum } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-instructorAdminUsers',
  templateUrl: './instructorAdminUsers.component.html',
  styleUrls: ['./instructorAdminUsers.component.css']
})
export class InstructorAdminUsersComponent extends AppComponentBase implements OnInit {
  id: any;
  form: FormGroup;
  userTypeLabelMapping: Record<string, string> = {
    [UserTypeEnum.Coach]: 'Coach',
    [UserTypeEnum.Mentors]: 'Mentors',
    [UserTypeEnum.Consultant]: 'Consultant',
  };
  usertype = Object.values(UserTypeEnum).filter((value) => typeof value === 'number');
  
  constructor(injector: Injector,   private _router: Router,
    private fb: FormBuilder,) {
    super(injector);
}

  ngOnInit() {
    this.createForm();
  }
  createForm(item: any = {}) {
    this.form = this.fb.group({
      id: [item.id ? item.id : this.emptyguId],
      name: [item.name ? item.name : '', Validators.required],
      industry: [item.industry ? item.industry : '', Validators.required],
      location: [item.location ? item.location : '', Validators.required],
      experience: [item.experience ? item.experience : '', Validators.required],
      qualification: [item.qualification ? item.qualification : '', Validators.required],
    });
  }
}
