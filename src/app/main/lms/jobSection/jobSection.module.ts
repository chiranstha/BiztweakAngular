import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSectionComponent } from './jobSection.component';
import { JobSectionRoutingModule } from './jobSection-routing.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { SubheaderModule } from "../../../shared/common/sub-header/subheader.module";
import { jobSectionModalComponent } from './jobSection-modal.component';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    declarations: [JobSectionComponent, jobSectionModalComponent],
    imports: [
        CommonModule,
        JobSectionRoutingModule,
        AppSharedModule,
        SubheaderModule,
        AdminSharedModule,
        ReactiveFormsModule,
        NgSelectModule
    ]
})
export class JobSectionModule { }
