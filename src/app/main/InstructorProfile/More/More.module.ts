import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoreComponent } from './More.component';
import { MoreRoutingModule } from './More-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MoreRoutingModule
  ],
  declarations: [MoreComponent]
})
export class MoreModule { }
