import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorAdminUsersComponent } from './instructorAdminUsers.component';
import { InstructorAdminUsersRoutingModule } from './instructorAdminUsers-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    InstructorAdminUsersRoutingModule, 
    ReactiveFormsModule,
    NgSelectModule
  ],
  declarations: [InstructorAdminUsersComponent]
})
export class InstructorAdminUsersModule { }
