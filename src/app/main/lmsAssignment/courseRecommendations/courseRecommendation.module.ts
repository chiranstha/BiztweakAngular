import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { CourseRecommendationRoutingModule } from './courseRecommendation-routing.module';
import { CourseRecommendationsComponent } from './courseRecommendations.component';
import { CreateOrEditCourseRecommendationModalComponent } from './create-or-edit-courseRecommendation-modal.component';
import { ViewCourseRecommendationModalComponent } from './view-courseRecommendation-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CourseRecommendationsComponent,
    CreateOrEditCourseRecommendationModalComponent,
    ViewCourseRecommendationModalComponent,
  ],
  imports: [AppSharedModule, CourseRecommendationRoutingModule, AdminSharedModule, NgSelectModule,
    ReactiveFormsModule],
})
export class CourseRecommendationModule {}
