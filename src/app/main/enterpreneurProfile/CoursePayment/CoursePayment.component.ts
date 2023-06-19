import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-CoursePayment',
  templateUrl: './CoursePayment.component.html',
  styleUrls: ['./CoursePayment.component.scss']
})
export class CoursePaymentComponent implements OnInit {

  constructor( private router: Router,) { }

  ngOnInit() {
    const items = document.querySelectorAll(".accordion button");

    function toggleAccordion() {
      const itemToggle = this.getAttribute('aria-expanded');
      
      if (itemToggle == 'false') {
        this.setAttribute('aria-expanded', 'true');
      } else {
        this.setAttribute('aria-expanded', 'false');
      }
    }
    
    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener('click', toggleAccordion);
    }    
  }
  navigateToCourse(){
    this.router.navigate(['/app/main/myCourses']);
  }
}
