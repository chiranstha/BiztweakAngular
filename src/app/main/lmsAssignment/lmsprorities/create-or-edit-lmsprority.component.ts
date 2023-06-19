import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { LmsproritiesServiceProxy, CreateOrEditLmsprorityDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';
import { ActivatedRoute, Router } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {Observable} from "@node_modules/rxjs";
import { BreadcrumbItem } from '@app/shared/common/sub-header/sub-header.component';

             import { DateTimeService } from '@app/shared/common/timing/date-time.service';



@Component({
    templateUrl: './create-or-edit-lmsprority.component.html',
    animations: [appModuleAnimation()]
})
export class CreateOrEditLmsprorityComponent extends AppComponentBase implements OnInit {
    active = false;
    saving = false;
    
    lmsprority: CreateOrEditLmsprorityDto = new CreateOrEditLmsprorityDto();



breadcrumbs: BreadcrumbItem[]= [
                        new BreadcrumbItem(this.l("Lmsprority"),"/app/main/lmsAssignment/lmsprorities"),
                        new BreadcrumbItem(this.l('Entity_Name_Plural_Here') + '' + this.l('Details')),
                    ];


    constructor(
        injector: Injector,
        private _activatedRoute: ActivatedRoute,        
        private _lmsproritiesServiceProxy: LmsproritiesServiceProxy,
        private _router: Router,
             private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.show(this._activatedRoute.snapshot.queryParams['id']);
        
    }

    show(lmsprorityId?: string): void {

        if (!lmsprorityId) {
            this.lmsprority = new CreateOrEditLmsprorityDto();
            this.lmsprority.id = lmsprorityId;


            this.active = true;
        } else {
            this._lmsproritiesServiceProxy.getLmsprorityForEdit(lmsprorityId).subscribe(result => {
                this.lmsprority = result;



                this.active = true;
            });
        }
        
         
    }
    
    save(): void {
        this.saving = true;
        
        this._lmsproritiesServiceProxy.createOrEdit(this.lmsprority)
            .pipe(finalize(() => {
                this.saving = false;
            }))
            .subscribe(x => {
                 this.saving = false;               
                 this.notify.info(this.l('SavedSuccessfully'));
                 this._router.navigate( ['/app/main/lmsAssignment/lmsprorities']);
            })
    }
    
    saveAndNew(): void {
        this.saving = true;
        
        this._lmsproritiesServiceProxy.createOrEdit(this.lmsprority)
            .pipe(finalize(() => {
                this.saving = false;
            }))
            .subscribe(x => {
                this.saving = false;               
                this.notify.info(this.l('SavedSuccessfully'));
                this.lmsprority = new CreateOrEditLmsprorityDto();
            });
    }













}
