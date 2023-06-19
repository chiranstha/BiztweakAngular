import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import {
  EntrepreneurStatesServiceProxy,
  CreateOrEditEntrepreneurStateDto,
  EntrepreneurStateInstructorsTableDto,
  EntrepreneurStateEntrepreneurTableDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { EntrepreneurStateEntrepreneurLookupTableModalComponent } from './entrepreneurState-entrepreneur-lookup-table-modal.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'createOrEditEntrepreneurStateModal',
  templateUrl: './create-or-edit-entrepreneurState-modal.component.html',
})
export class CreateOrEditEntrepreneurStateModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @ViewChild('entrepreneurStateEntrepreneurLookupTableModal', { static: true })
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;
  form: FormGroup;
  id: any;
  filterText: any;
  sorting: any;
  skipCout: any;
  maxCount: any;
  Instructor$: Observable<EntrepreneurStateInstructorsTableDto[]>;
  entrepreneur$: Observable<EntrepreneurStateEntrepreneurTableDto[]>;
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private _entrepreneurStatesServiceProxy: EntrepreneurStatesServiceProxy,
    private _dateTimeService: DateTimeService
  ) {
    super(injector);
  }
  entrepreneurDetails(): FormArray {
    return this.form.get('details') as FormArray;
  }
  ngOnInit(): void {
    this.createForm();
    this.getEntrepreneurDropdown();
    this.getInstructorsDropdown();
  }

  createForm(item: any = {}) {
    this.form = this.fb.group({
      id: [item.id ? item.id : this.emptyguId],
      sessionHighlight: [item.sessionHighlight ? item.sessionHighlight : '', Validators.required],
      generalComment: [item.generalComment ? item.generalComment : '', Validators.required],
      name: [item.name ? item.name : '', Validators.required],
      entrepreneurId: [{ value: item.entrepreneurId, disabled: this.id }, Validators.required],
      instructorsId: [{ value: item.instructorsId, disabled: this.id }, Validators.required],
      details: this.fb.array(
        (() => {
          if (!item.details) {
            return [this.createDetailsForm()];
          }
          return item.details.map((item) => this.createDetailsForm(item));
        })()
      ),
    });
}
 createDetailsForm(item: any = {}){
  return this.fb.group({
    id: [item.id ? item.id : this.emptyguId],
    name: [item.name ? item.name : '', Validators.required],
    description: [item.description ? item.description : '', Validators.required],
    progress: [item.progress ? item.progress : '', Validators.required],
  });
}
getEntrepreneurDropdown(){
  this.entrepreneur$ = this._entrepreneurStatesServiceProxy.getAllEntrepreneurForTable();
}
getInstructorsDropdown(){
  this.Instructor$ = this._entrepreneurStatesServiceProxy.getAllInstructorsForTableDropdown();
}
addentrepreneurDetails(){
  this. entrepreneurDetails().push(this.createDetailsForm());
}
show(id){
  this.active = true;
  this.modal.show();
}
close(){
  this.active = false;
  this.modal.hide();
}
save(){}
  // show(entrepreneurStateId?: string): void {
  //   if (!entrepreneurStateId) {
  //     this.entrepreneurState = new CreateOrEditEntrepreneurStateDto();
  //     this.entrepreneurState.id = entrepreneurStateId;
  //     this.entrepreneurName = '';
  //     this.instructorsName = '';

  //     this.active = true;
  //     this.modal.show();
  //   } else {
  //     this._entrepreneurStatesServiceProxy.getEntrepreneurStateForEdit(entrepreneurStateId).subscribe((result) => {
  //       this.entrepreneurState = result;

  //       this.entrepreneurName = result.entrepreneurName;
  //       this.instructorsName = result.instructorsName;

  //       this.active = true;
  //       this.modal.show();
  //     });
  //   }
  //   this._entrepreneurStatesServiceProxy.getAllInstructorsForTableDropdown().subscribe((result) => {
  //     this.allInstructorss = result;
  //   });
  // }


}
