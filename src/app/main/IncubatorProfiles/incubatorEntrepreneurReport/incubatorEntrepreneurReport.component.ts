import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incubatorEntrepreneurReport',
  templateUrl: './incubatorEntrepreneurReport.component.html',
  styleUrls: ['./incubatorEntrepreneurReport.component.scss']
})
export class IncubatorEntrepreneurReportComponent implements OnInit {

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


