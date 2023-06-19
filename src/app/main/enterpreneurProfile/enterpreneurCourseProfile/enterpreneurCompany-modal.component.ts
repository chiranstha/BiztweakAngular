import { Component, ElementRef, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CompanyBankTableDto, EntrepreneurAssignmentServiceProxy, EntrepreneurProfileServiceProxy, GetBusinessPhaseLookupDto, GetEntrepreneurProfileViewDto } from '@shared/service-proxies/service-proxies';
import { DateTime } from 'luxon';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

@Component({
    selector: 'enterpreneurCompanymodal',
    templateUrl: './enterpreneurCompany-modal.component.html'
})

export class enterpreneurCompanymodalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('uploadProfilePictureInputLabel') uploadProfilePictureInputLabel: ElementRef;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    saving = false;
    id: any;
    form: FormGroup;
    phase$: Observable<GetBusinessPhaseLookupDto[]>;
    industry$: Observable<CompanyBankTableDto[]>;
    entrepeneureProfile: GetEntrepreneurProfileViewDto;
    constructor(
        injector: Injector,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private _proxy: EntrepreneurProfileServiceProxy,
        private router: Router

    ) {
        super(injector);
    }
    ngOnInit(): void {
        this.createForm();
        this.getBusinessPhase();
        this.getIndustryDropdown();
        this.getAllEnterpreneurProfile();
    }
    createForm(item: any = {}) {
        this.form = this.fb.group({
            id: [ this.emptyguId],
            name: [''],
            logoUrl: [item.logoUrl ? item.logoUrl : ''],
            logoToken: [item.logoToken ? item.logoToken : '' ],
            isCompanyRegistered: [item.isCompanyRegistered ? item.isCompanyRegistered : false],
            location: [item.location ? item.location : ''],
            noOfEmployee: [item.noOfEmployee ? item.noOfEmployee : 0],
            annualTurnOver: [item.annualTurnOver ? item.annualTurnOver : 0],
            monthlyTurnOver: [item.monthlyTurnOver ? item.monthlyTurnOver : 0],
            serviceDescription: [item.serviceDescription ? item.serviceDescription : ''],
            description: [item.description ? item.description : ''],
            businessOperationDate: [item.businessOperationDate ? item.businessOperationDate : DateTime.now()],
            cardTurnOver: [item.cardTurnOver ? item.cardTurnOver : 0],
            cashTurnOver: [item.cashTurnOver ? item.cashTurnOver : 0],
            eftTurnOver: [item.eftTurnOver ? item.eftTurnOver : 0],
            bankId: [item.bankId ? item.bankId : this.emptyguId],
            industryId: [item.industryId ? item.industryId : '', Validators.required],
            businessPhaseId: [item.businessPhaseId ? item.businessPhaseId : '', Validators.required],


        });
    }
    getBusinessPhase() {
        this.phase$ = this._proxy.getAllBusinessPhaseForTableDropdown();
    }
    getIndustryDropdown() {
        this.industry$ = this._proxy.getAllIndustryForTableDropdown();
    }

    getAllEnterpreneurProfile() {
        this._proxy.getEntrepreneurProfile().subscribe((result) => {
            this.entrepeneureProfile = result;
            this.createForm(this.entrepeneureProfile);
        });
    }
    show() {
        this.active = true;
        this.modal.show();
    }
    save() {
        if (this.form.valid) {

          this._proxy.createCompany(this.form.getRawValue()).subscribe((res) => {
            this.active = false;
            this.saving = false;
            this.form.reset();
            this.modal.hide();
            this.modalSave.emit(null);
            this.notify.success('Saved Successfully' + res);
            this.router.navigate(['/app/main/EnterpreneurAssessment/', res ]);
          });
        } else {
          this.saving = false;
          this.notify.error('Form is invalid!!');
        }
    }
    close(): void {
        this.active = false;
        this.modal.hide();
        this.saving = false;
        this.modalSave.emit(null);
    }
}
