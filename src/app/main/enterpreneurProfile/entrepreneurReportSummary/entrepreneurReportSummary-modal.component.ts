import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'entrepreneurCoursemodal',
    templateUrl: './entrepreneurReportSummary-modal.component.html',
    styleUrls: ['./entrepreneurReportSummary.component.scss']
})

export class entrepreneurCoursemodalComponent extends AppComponentBase implements OnInit{
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    constructor(
        injector: Injector, private router: Router,
        private route: ActivatedRoute
    ) {
        super(injector);
    }
    ngOnInit(): void {}
    show() {
        this.active = true;
        this.modal.show();
    }
    close(){
        this.modal.hide();
    }
    navigatetoPayment() {
        console.log('jhasgd');
        this.router.navigate(['/app/main/payment']);
    }

}
