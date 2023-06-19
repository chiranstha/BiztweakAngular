import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { takeUntil } from 'rxjs/operators';
import {
  AssignmentCategoriesServiceProxy,
  CommonDropDownDto,
  GetBusinessPhaseLookupDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'createOrEditAssignmentCategoryModal',
  templateUrl: './create-or-edit-assignmentCategory-modal.component.html',
})
export class CreateOrEditAssignmentCategoryModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('businessPhase ') businessPhaseRef: NgSelectComponent;
  @ViewChild('nameRef', { read: ElementRef }) nameRef: ElementRef;
  @ViewChild('orderRef', { read: ElementRef }) orderRef: ElementRef;
  @ViewChild('shortDesRef', { read: ElementRef }) shortDesRef: ElementRef;
  active = false;
  saving = false;
  form: FormGroup;
  public destroy$ = new Subject<void>();
  business$: Observable<CommonDropDownDto[]>;
  assignmentType$: Observable<GetBusinessPhaseLookupDto[]>;
  id: any;
  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _assignmentCategoriesServiceProxy: AssignmentCategoriesServiceProxy,
    private _dateTimeService: DateTimeService
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.createForm();
    this.businessPhaseDropdown();
    this.assignmentTypeDropdown();
  }
  createForm(item: any = {}) {
    this.form = this.fb.group({
      id: [item.id ? item.id : this.emptyguId],
      name: [item.name ? item.name : '', Validators.required],
      order: [item.order ? item.order : '', Validators.required],
      shortDescription: [item.shortDescription ? item.shortDescription : '', Validators.required],
     businessPhaseId: [item.businessPhaseId , Validators.required],
     assignmentTypeId: [item.assignmentTypeId , Validators.required],
    });
  }
  show(id) {
    this.active = true;
    this.modal.show();
  }
  businessPhaseDropdown(){
    this.business$ = this._assignmentCategoriesServiceProxy.getAllBusinessPhaseForTableDropdown();
  }

  assignmentTypeDropdown(){
    this.assignmentType$ = this._assignmentCategoriesServiceProxy.getAllAssignmentTypeForTableDropdown();
  }

  showEdit(id: string): void {
    this.active = true;
    this.modal.show();
    this._assignmentCategoriesServiceProxy
      .getAssignmentCategoryForEdit(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.createForm(result);
      });
  }
  save() {
    this.saving = true;
    if (this.form.valid) {
      this._assignmentCategoriesServiceProxy
        .createOrEdit(this.form.getRawValue())
        .subscribe(() => {
          this.active = false;
          this.saving = false;
          this.form.reset();
          this.modal.hide();
          this.modalSave.emit(null);
          this.notify.success('Saved Successfully');
        });
    } else {
      this.saving = false;
      this.notify.error('Form is invalid!!');
    }
  }

  close(): void {
    this.active = false;
    this.saving = false;
    this.form.reset();
    this.modal.hide();
    this.modalSave.emit(null);
  }
  shortCutOnEnter(position, e?: KeyboardEvent) {
    switch (position) {
        case 'businessPhase':
          this.nameRef.nativeElement.focus();
            break;
            case 'nameRef':
              this.orderRef.nativeElement.focus();
                break;
                case 'orderRef':
                  this.shortDesRef.nativeElement.focus();
                    break;
        default:
            break;
    }
}

}
