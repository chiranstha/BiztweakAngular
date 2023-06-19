import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrepreneurHomePageComponent } from './EntrepreneurHomePage.component';
import { EntrepreneurHomePageRoutingModule } from './EntrepreneurHomePage-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EntrepreneurHomePageRoutingModule
  ],
  declarations: [EntrepreneurHomePageComponent]
})
export class EntrepreneurHomePageModule { }
