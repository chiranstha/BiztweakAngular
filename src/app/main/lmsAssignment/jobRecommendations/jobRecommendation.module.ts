import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { JobRecommendationRoutingModule } from './jobRecommendation-routing.module';
import { JobRecommendationsComponent } from './jobRecommendations.component';
import { CreateOrEditJobRecommendationModalComponent } from './create-or-edit-jobRecommendation-modal.component';
import { ViewJobRecommendationModalComponent } from './view-jobRecommendation-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    JobRecommendationsComponent,
    CreateOrEditJobRecommendationModalComponent,
    ViewJobRecommendationModalComponent,
  ],
  imports: [AppSharedModule, JobRecommendationRoutingModule, AdminSharedModule, NgSelectModule],
})
export class JobRecommendationModule {}
