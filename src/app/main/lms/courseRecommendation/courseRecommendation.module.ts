import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseRecommendationComponent } from './courseRecommendation.component';
import { CourseRecommendationRoutingModule } from './courseRecommendation-routing.module';
import { SubheaderModule } from "../../../shared/common/sub-header/subheader.module";
import { UtilsModule } from "../../../../shared/utils/utils.module";
import { courseRecommendationModalComponent } from './courseRecommendation-modal.component';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CourseRecommendationComponent, 
        courseRecommendationModalComponent
    ],
    imports: [
        CommonModule,
        CourseRecommendationRoutingModule,
        SubheaderModule,
        UtilsModule,
        AppSharedModule,
        ReactiveFormsModule
     
    ]
})
export class CourseRecommendationModule { }
