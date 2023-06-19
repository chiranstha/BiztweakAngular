import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentorsData',
  templateUrl: './mentorsData.component.html',
  styleUrls: ['../dashboard.component.less']
})
export class MentorsDataComponent implements OnInit {
  constructor(private _router: Router) { }

  ngOnInit() {
  }  
  NavigateToEntrepreneur(){
    this._router.navigate(['app/main/entrepreneurData']);
}
NavigateToConsultant(){
    this._router.navigate(['app/main/consultantData']);
}
NavigateToMentors(){
  this._router.navigate(['app/main/mentorsData']);
}
NavigateToIncubator(){
  this._router.navigate(['app/main/incubatorsData']);
}
}
