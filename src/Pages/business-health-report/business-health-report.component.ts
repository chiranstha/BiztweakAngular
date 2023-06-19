import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-health-report',
  templateUrl: './business-health-report.component.html',
  styleUrls: ['./business-health-report.component.scss']
})
export class BusinessHealthReportComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
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
  NavigateToReportSummary(){
    this.router.navigate(['/reportSummary']);
  }
}
