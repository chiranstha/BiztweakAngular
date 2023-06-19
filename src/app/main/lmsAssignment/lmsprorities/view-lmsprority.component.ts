import {AppConsts} from "@shared/AppConsts";
import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LmsproritiesServiceProxy, GetLmsprorityForViewDto, LmsprorityDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ActivatedRoute } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { BreadcrumbItem } from '@app/shared/common/sub-header/sub-header.component';
@Component({
    templateUrl: './view-lmsprority.component.html',
    animations: [appModuleAnimation()]
})
export class ViewLmsprorityComponent extends AppComponentBase implements OnInit {

    active = false;
    saving = false;

    item: GetLmsprorityForViewDto;

breadcrumbs: BreadcrumbItem[]= [
                        new BreadcrumbItem(this.l("Lmsprority"),"/app/main/lmsAssignment/lmsprorities"),
                        new BreadcrumbItem(this.l('Lmsprorities') + '' + this.l('Details')),
                    ];
    constructor(
        injector: Injector,
        private _activatedRoute: ActivatedRoute,
         private _lmsproritiesServiceProxy: LmsproritiesServiceProxy
    ) {
        super(injector);
        this.item = new GetLmsprorityForViewDto();
        this.item.lmsprority = new LmsprorityDto();        
    }

    ngOnInit(): void {
        this.show(this._activatedRoute.snapshot.queryParams['id']);
    }

    show(lmsprorityId: string): void {
      this._lmsproritiesServiceProxy.getLmsprorityForView(lmsprorityId).subscribe(result => {      
                 this.item = result;
                this.active = true;
            });       
    }
    
    
}
