import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instructorEntrepreneurReport',
  templateUrl: './instructorEntrepreneurReport.component.html',
  styleUrls: ['./instructorEntrepreneurReport.component.scss']
})
export class InstructorEntrepreneurReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const items = document.querySelectorAll(".accordion button");
    function toggleAccordion() {
      const itemToggle = this.getAttribute('aria-expanded');
      for (let i = 0; i < items.length; i++) {
        items[i].setAttribute('aria-expanded', 'false');
      }
      if (itemToggle == 'false') {
        this.setAttribute('aria-expanded', 'true');
      }
    }
    items.forEach(item => item.addEventListener('click', toggleAccordion));
      }
  }

