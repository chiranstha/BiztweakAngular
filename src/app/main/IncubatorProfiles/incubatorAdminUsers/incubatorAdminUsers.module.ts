import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncubatorAdminUsersComponent } from './incubatorAdminUsers.component';
import { IncubatorAdminUsersRoutingModule } from './incubatorAdminUsers-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    IncubatorAdminUsersRoutingModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  declarations: [IncubatorAdminUsersComponent]
})
export class  IncubatorAdminUsersModule { }
