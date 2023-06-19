import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myCourses',
  templateUrl: './myCourses.component.html',
  styleUrls: ['./myCourses.component.scss']
})
export class MyCoursesComponent implements OnInit {

  constructor() { }

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
  }


