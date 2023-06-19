import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultantData',
  templateUrl: './consultantData.component.html',
  styleUrls: ['../dashboard.component.less']
})
export class ConsultantDataComponent implements OnInit {

  constructor( private _router: Router,) { }

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
